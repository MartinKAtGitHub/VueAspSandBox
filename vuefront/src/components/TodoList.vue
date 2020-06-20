<template>
	<!-- Edit todo list modal -->
	<div class="todo-list">
		<div id="editTodoListModal" class="todo-app-modal">
			<div class="todo-app-modal-content edit-modal">
				<div class="todo-app-modal-content-header">
					<h2>Edit List</h2>

					<span
						@click="closeEditTodoListModal"
						class="todo-app-modal-close"
						>&times;</span
					>
				</div>

				<form @submit.prevent="updateTodoList">
					<input
						type="text"
						v-model="newTodoListName"
						:placeholder="todoList.listName"
					/>
					<div>
						<button
							id="editTodoListSubmitButton"
							class="edit-todo-list-submit-btn"
							type="submit"
						>
							Update Todo List
							<fa-icon
								id="editTodoListSpinner"
								class="edit-todo-list-spinner"
								icon="spinner"
								spin
							/>
						</button>

						<button
							id="deleteTodoListSubmitButton"
							class="delete-todo-list-btn"
							type="button"
						>
							Delete This List
							<fa-icon
								id="deleteTodoListSpinner"
								class="delete-todo-list-spinner"
								icon="spinner"
								spin
							/>
						</button>
					</div>
				</form>
			</div>
		</div>
		<!-- Add new todo item modal -->
		<div id="addTodoModal" class="todo-app-modal">
			<div class="todo-app-modal-content">
				<div class="todo-app-modal-content-header">
					<span
						@click="closeAddTodoModal"
						class="todo-app-modal-close"
						>&times;</span
					>
				</div>
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

		<section class="todo-list-main-top">
			<h1 @click="openEditTodoListModal">{{ todoList.listName }}</h1>
		</section>

		<section class="todo-items-container">
			<div v-if="todoList.todoItems.length > 0">
				<div v-bind:key="item.id" v-for="item in todoList.todoItems">
					<TodoItem
						:todo-item-data="item"
						v-on:delete-item-event="deleteTodoItem"
						v-on:edit-item-event="editTodoItem"
					/>
				</div>

				<button
					id="addTodoBtn"
					class="add-todo-item-btn"
					@click="openAddTodoModal"
				>
					<fa-icon icon="plus-circle" /> add item
				</button>
			</div>
			<div v-else><h3>List is empty</h3></div>
		</section>
	</div>
</template>

<script lang="ts">
import TodoItem from '@/components/TodoItem.vue';

import {TodoItemData} from '@/Models/TodoItemData';
import axios from 'axios';
import {Component, Vue, Prop} from 'vue-property-decorator';
import {TodoListData} from '../Models/TodoListData';

@Component({
	components: {
		TodoItem,
	},
})
export default class TodoList extends Vue {
	private readonly pageTitle = 'Todo list';

	private newTodoListName = '';

	private newTodoItemName = '';
	private newTodoItemDesc = '';
	private newTodoItemIsComplete = false;

	private isLoading = true;

	private editTodoListModal!: HTMLDivElement;
	private editTodoListSubmitButton!: HTMLButtonElement;
	private editTodoListSpinner!: HTMLElement;

	private addTodoSubmitBtn!: HTMLButtonElement;
	private addTodoModal!: HTMLDivElement;
	private addTodoSpinner!: HTMLElement;

	@Prop() todoList!: TodoListData | null;

	// lifecycle hook, fires of depending on the stage of vue
	created() {
		//this.getListItems();
	}
	mounted() {
		this.editTodoListModal = document.getElementById(
			'editTodoListModal'
		) as HTMLDivElement;
		this.editTodoListSubmitButton = document.getElementById(
			'editTodoListSubmitButton'
		) as HTMLButtonElement;
		this.editTodoListSpinner = document.getElementById(
			'editTodoListSpinner'
		) as HTMLElement;

		this.addTodoSpinner = document.getElementById(
			'addTodoSpinner'
		) as HTMLElement;

		this.addTodoModal = document.getElementById(
			'addTodoModal'
		) as HTMLDivElement;

		this.addTodoSubmitBtn = document.getElementById(
			'addTodoSubmitBtn'
		) as HTMLButtonElement;

		window.onclick = (e: Event) => {
			if (e.target == this.addTodoModal) {
				this.addTodoModal.style.display = 'none';
			}

			if (e.target == this.editTodoListModal) {
				this.editTodoListModal.style.display = 'none';
			}
		};
	}

	private openEditTodoListModal() {
		this.editTodoListModal.style.display = 'block';
	}
	private closeEditTodoListModal() {
		this.editTodoListModal.style.display = 'none';
	}

	private openAddTodoModal() {
		this.addTodoModal.style.display = 'block';
	}

	private closeAddTodoModal() {
		this.addTodoModal.style.display = 'none';
	}

	private updateTodoLists() {
		this.$emit('on-delete-list', this.todoList);
	}

	//get
	// private getListItems() {
	// 	axios
	// 		.get('/api/TodoItems')
	// 		.then((result) => {
	// 			for (let i = 0; i < result.data.length; i++) {
	// 				const element = result.data[i];
	// 				this.todoItems.push(new TodoItemData(element));
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 			this.isTodoListDataLoaded = false;
	// 		})
	// 		.finally(() => {
	// 			this.isLoading = false;
	// 		});
	// }

	// post
	private addTodoItem(e: Event) {
		e.preventDefault();
		this.addTodoSubmitBtn.disabled = true;
		this.addTodoSpinner.style.display = 'inline-block';
		const dataObj = {
			name: this.newTodoItemName,
			desc: this.newTodoItemDesc,
			isComplete: this.newTodoItemIsComplete,
		};
		axios
			.post(`/api/TodoItems/`, dataObj)
			.then((res) => {
				//this.todoItems.push(new TodoItemData(res.data));
				this.todoList?.todoItems.push(new TodoItemData(res.data)); //TODO #31 block req

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
				//this.todoItems.splice(this.todoItems.indexOf(item), 1);
				const list = this.todoList; // TODO #31 block req
				if (list !== null) {
					list.todoItems.splice(list.todoItems.indexOf(item), 1);
				}
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

	private updateTodoList() {
		//TODO #31
		if (this.todoList !== null) {
			this.editTodoListSubmitButton.disabled = true;
			this.editTodoListSpinner.style.display = 'inline-block';

			const dataObj = {
				id: this.todoList.id,
				name: this.newTodoListName,
			};

			axios
				.put(`/api/TodoLists/${this.todoList.id}`, dataObj)
				.then(() => {
					if (this.todoList !== null) {
						this.todoList.listName = this.newTodoListName;
						this.newTodoListName = '';
					}
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					this.closeEditTodoListModal();
					this.editTodoListSubmitButton.disabled = false;
					this.editTodoListSpinner.style.display = 'none';
				});
		} else {
			console.error('Todo list is NULL, but you are trying to edit it');
		}
	}
	// Del list
	private deleteTodoList() {
		axios
			.delete(`/api/TodoLists/${this.todoList?.id}`)
			.then((res) => {
				//delBtn.disabled = true;
				this.updateTodoLists();
			})
			.catch((error) => {
				console.log(error.response.data);
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
	/* padding-bottom: 2em; */
	min-height: 100px;
}

.todo-list-main-top {
	display: flex;
	justify-content: space-between;
	padding: 1em;
}
.todo-list-main-top h1 {
	box-sizing: border-box;
	cursor: pointer;
	word-wrap: break-word;
}
.todo-list-main-top h1:hover {
	text-decoration: underline;
}

.edit-modal {
	background-color: #9adcf7;
}

.edit-modal form div {
	display: flex;
	justify-content: space-between;
}
.edit-modal input {
	border-bottom: 2px solid #6878d2;
	color: #2c3e50;
}
.add-todo-submit-btn,
.edit-todo-list-submit-btn,
.delete-todo-list-btn {
	display: block;
	padding: 1em 2em;
	border: none;
	color: white;
	cursor: pointer;
}
.edit-todo-list-submit-btn {
	background-color: #5282c2;
}
.delete-todo-list-btn {
	background-color: #d63a3a;
}

.add-todo-submit-btn {
	background-color: #26925e;
}
.add-todo-item-btn {
	background-color: #28e91b;
	border: none;
	color: white;
	padding: 1em;
	font-size: 1rem;
	cursor: pointer;

	border-radius: 0px 0px 10px 10px;
	width: 100%;
}

.add-todo-submit-btn:hover {
	background-color: #1c7c4e;
}

.add-todo-spinner,
.edit-todo-list-spinner,
.delete-todo-list-spinner {
	display: none;
}
</style>
