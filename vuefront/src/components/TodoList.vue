<template>
	<div class="todo-list">
		<section class="todo-list-main-top">
			<h1>List name</h1>
			<button id="addTodoBtn" class="add-todo-item-btn">
				<fa-icon icon="plus-circle" /> add item
			</button>
		</section>

		<section class="todo-items-container" v-if="isTodoListDataLoaded">
			<div id="addTodoModal" class="add-todo-modal">
				<div class="add-todo-modal-content">
					<span id="closeTodoModal" class="close-todo-modal"
						>&times;</span
					>
					<!-- <div id="addTodoContainer" class=""> -->

					<form @submit="addTodoItem">
						<input
							type="text"
							v-model="newTodoItemName"
							name="newTodoItemName"
							placeholder="Todo Name"
						/>
						<input
							type="text"
							v-model="newTodoItemDesc"
							name="newTodoItemDesc"
							placeholder="Todo Description"
						/>
						<!-- <input type="submit" /> -->
						<button
							id="addTodoSubmitBtn"
							class="add-todo-submit-btn"
							type="submit"
						>
							Add Todo
							<fa-icon
								id="addTodoSpinner"
								class="add-todo-spinner"
								icon="spinner"
								spin
							/>
						</button>
					</form>
					<!-- </div> -->
				</div>
			</div>

			<div v-if="isLoading">
				Loading data <fa-icon icon="spinner" spin />
			</div>
			<div
				v-else-if="todoItems.length > 0"
				v-bind:key="item.id"
				v-for="item in todoItems"
			>
				<TodoItem
					:todo-item-data="item"
					v-on:delete-item-event="deleteTodoItem"
					v-on:edit-item-event="editTodoItem"
				/>
			</div>

			<div v-else><h3>No todos in this list</h3></div>
		</section>
		<section v-else>
			<h3>An error has occurred, please try again later</h3>
		</section>
	</div>
</template>

<script lang="ts">
import TodoItem from '@/components/TodoItem.vue';

import {TodoItemData} from '@/Models/TodoItemData';
import axios from 'axios';
import {Component, Vue} from 'vue-property-decorator';

@Component({
	components: {
		TodoItem,
	},
})
export default class TodoList extends Vue {
	private readonly pageTitle = 'Todo list';
	private newTodoItemName = '';
	private newTodoItemDesc = '';
	private newTodoItemIsComplete = false;

	private isTodoListDataLoaded = true;
	private isLoading = true;

	todoItems: TodoItemData[] = [];

	private addTodoSubmitBtn!: HTMLButtonElement;
	private addTodoModal!: HTMLDivElement;
	private addTodoSpinner!: HTMLElement;
	// lifecycle hook, fires of depending on the stage of vue
	created() {
		this.getListItems();
		// this.devMode();
	}
	mounted() {
		this.addTodoModalSetup();
	}

	private devMode() {
		const elementA = {
			id: '99',
			name: 'DEV TODO',
			desc: 'For dev testing',
			isComplete: false,
		};

		const elementB = {
			id: '98',
			name: 'DEV TODO',
			desc: 'For dev testing',
			isComplete: false,
		};

		const elementC = {
			id: '97',
			name: 'DEV TODO',
			desc: 'For dev testing',
			isComplete: false,
		};

		this.todoItems.push(new TodoItemData(elementA));
		this.todoItems.push(new TodoItemData(elementB));
		this.todoItems.push(new TodoItemData(elementC));

		this.isLoading = false;
		console.warn('DEV DATA ENABLED! NOT FETCHING DATA FROM API');
	}

	private addTodoModalSetup() {
		this.addTodoSpinner = document.getElementById(
			'addTodoSpinner'
		) as HTMLElement;

		this.addTodoModal = document.getElementById(
			'addTodoModal'
		) as HTMLDivElement;
		this.addTodoSubmitBtn = document.getElementById(
			'addTodoSubmitBtn'
		) as HTMLButtonElement;

		const addTodoBtn = document.getElementById(
			'addTodoBtn'
		) as HTMLButtonElement;
		const closeTodoModal = document.getElementById(
			'closeTodoModal'
		) as HTMLSpanElement;

		addTodoBtn.onclick = () => {
			this.addTodoModal.style.display = 'block';
		};

		closeTodoModal.onclick = () => {
			this.addTodoModal.style.display = 'none';
		};

		window.onclick = (e: Event) => {
			if (e.target == this.addTodoModal) {
				this.addTodoModal.style.display = 'none';
			}
		};
	}

	//get
	private getListItems() {
		axios
			.get('/api/TodoItems')
			.then((result) => {
				for (let i = 0; i < result.data.length; i++) {
					const element = result.data[i];
					this.todoItems.push(new TodoItemData(element));
				}
			})
			.catch((error) => {
				console.log(error);
				this.isTodoListDataLoaded = false;
			})
			.finally(() => {
				this.isLoading = false;
			});
	}

	// post
	private addTodoItem(e: Event) {
		e.preventDefault();
		const dataObj = {
			name: this.newTodoItemName,
			desc: this.newTodoItemDesc,
			isComplete: this.newTodoItemIsComplete,
		};
		axios
			.post(`/api/TodoItems/`, dataObj)
			.then((res) => {
				this.addTodoSubmitBtn.disabled = true;
				this.addTodoSpinner.style.display = 'inline-block';
				this.todoItems.push(new TodoItemData(res.data));

				//small delay, might remove it
				return new Promise((resolve) => setTimeout(resolve, 1000));
			})
			.catch((error) => console.log(error.response.data))
			.finally(() => {
				this.addTodoSubmitBtn.disabled = false;
				this.addTodoSpinner.style.display = 'none';
				this.addTodoModal.style.display = 'none';
				this.newTodoItemName = '';
				this.newTodoItemDesc = '';
			});
	}

	//delete
	private deleteTodoItem(item: TodoItemData, delBtn: HTMLButtonElement) {
		axios
			.delete(`/api/TodoItems/${item.id}`)
			.then((res) => {
				delBtn.disabled = true;
				this.todoItems.splice(this.todoItems.indexOf(item), 1);
			})
			.catch((error) => {
				console.log(error.response.data);
			});
	}

	//put
	private editTodoItem(item: TodoItemData) {
		const dataObj = {
			id: item.id,
			name: item.itemName,
			desc: item.itemDesc,
			isComplete: item.isComplete,
		};
		axios
			.put(`/api/TodoItems/${item.id}`, dataObj)
			.then(() => {
				item.setNewDefaultValues(
					dataObj.name,
					dataObj.desc,
					dataObj.isComplete
				);
			})
			.catch((error) => {
				console.log(error.response.data);
				//location.reload(); // Don't think this is the best idea
				item.resetDefault(); // hmm
			});
	}
}
</script>

<style scoped>
.todo-list {
	padding: 1em;
}

.todo-items-container {
	background-color: #68d282;
	border-radius: 10px;
	padding-top: 2em;
	padding-bottom: 2em;
	min-height: 100px;
}

.todo-list-main-top {
	display: flex;
	justify-content: space-between;
	padding: 1em;
}

.add-todo-item-btn {
	background-color: rgb(27, 233, 79);
	border: none;
	color: white;
	padding: 1em;
	font-size: 1rem;
	cursor: pointer;
	border-radius: 15px;
}

.add-todo-modal input {
	display: block;
	padding: 1em 0.5em;
	margin: auto;
	width: 100%;
	margin-bottom: 4em;
	background: none;
	border: none;
	border-bottom: 2px solid #249090;
	cursor: pointer;
	font-size: 1.2rem;
}

.add-todo-submit-btn {
	display: block;
	padding: 1em 2em;
	background-color: #26925e;
	border: none;
	color: white;
	cursor: pointer;
}
.add-todo-submit-btn:hover {
	background-color: #1c7c4e;
}

.add-todo-spinner {
	display: none;
}

.add-todo-modal {
	display: none;
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.4);
}
.add-todo-modal-content {
	background-color: #d6ffd9;
	margin: 15% auto;
	padding: 5em;
	border: 1px solid #888;
	width: 80%;
	box-sizing: border-box;
}

.close-todo-modal {
	color: #aaa;
	float: right;
	font-size: 2em;
	font-weight: bold;
	margin-bottom: 1em;
}
.close-todo-modal:hover,
.close-todo-modal:focus {
	color: black;
	text-decoration: none;
	cursor: pointer;
}
</style>
