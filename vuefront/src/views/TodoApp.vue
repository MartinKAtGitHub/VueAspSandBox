<template>
	<div class="todo-app">
		<!-- add new list modal -->
		<div id="addTodoListModal" class="add-todo-list-modal">
			<div class="add-todo-list-modal-content">
				<span
					@click="closeAddTodoListModal"
					id="closeTodoListModal"
					class="close-todo-list-modal"
					>&times;</span
				>
				<h2>Add New List</h2>

				<form @submit.prevent="addTodoList">
					<input
						type="text"
						v-model="newTodoListName"
						name="newTodoItemName"
						placeholder="Todo List Name"
					/>
					<button
						id="addTodoListSubmitBtn"
						class="add-todo-list-submit-btn"
						type="submit"
					>
						Add Todo
						<fa-icon
							id="addTodoListSpinner"
							class="add-todo-list-spinner"
							icon="spinner"
							spin
						/>
					</button>
				</form>
			</div>
		</div>

		<section class="todo-app-sidebar">
			<div class="sidebar-top">
				<button @click="openAddTodoListModal" class="add-todo-list-btn">
					<fa-icon icon="plus-circle" />
				</button>
			</div>
			<div class="sidebar-bot">
				<ul class="fa-ul">
					<li
						:key="list.id"
						v-for="list in todoLists"
						@click="setActiveList(list.todoItems)"
					>
						<span class="fa-li"><fa-icon icon="list-ul"/></span>
						{{ list.listName }}
					</li>
				</ul>
			</div>
		</section>
		<section class="todo-app-list-content">
			<TodoList :todo-items="activeTodoItems" />
		</section>
	</div>
</template>

<script lang="ts">
import axios from 'axios';
import TodoList from '@/components/TodoList.vue';
import {Component, Vue} from 'vue-property-decorator';
import {TodoItemData} from '@/Models/TodoItemData';
import {TodoListData} from '@/Models/TodoListData';

@Component({
	components: {
		TodoList,
	},
})
export default class TodoApp extends Vue {
	private readonly pageTitle = 'Todo App';
	private newTodoListName = '';
	private activeTodoItems: TodoItemData[] | null = null;

	todoLists: TodoListData[] = [];

	private addTodoListModal!: HTMLElement;
	private closeTodoListModal!: HTMLElement;
	private addTodoListSubmitBtn!: HTMLButtonElement;
	private addTodoListSpinner!: HTMLElement;

	created() {
		this.getTodoLists();
		// this.devMode();
	}

	mounted() {
		this.findAddTodoListModalElements();
	}

	private openAddTodoListModal() {
		this.addTodoListModal.style.display = 'block';
	}

	private closeAddTodoListModal() {
		this.addTodoListModal.style.display = 'none';
	}

	private findAddTodoListModalElements() {
		this.addTodoListModal = document.getElementById(
			'addTodoListModal'
		) as HTMLElement;
		this.closeTodoListModal = document.getElementById(
			'closeTodoListModal'
		) as HTMLElement;
		this.addTodoListSubmitBtn = document.getElementById(
			'addTodoListSubmitBtn'
		) as HTMLButtonElement;

		this.addTodoListSpinner = document.getElementById(
			'addTodoListSpinner'
		) as HTMLElement;
	}

	private setActiveList(todoItems: TodoItemData[]) {
		this.activeTodoItems = todoItems;
	}

	private createNewList() {
		const dataObj = {
			name: this.newTodoListName,
		};

		axios
			.post('/api/TodoLists', dataObj)
			.then((result) => {})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {});
	}

	private getTodoLists() {
		axios
			.get('/api/TodoLists')
			.then((result) => {
				for (let i = 0; i < result.data.length; i++) {
					const element = result.data[i];
					this.todoLists.push(new TodoListData(element));
				}
			})
			.catch((error) => {
				console.log(error);
				//this.isTodoListDataLoaded = false;
			})
			.finally(() => {
				//this.isLoading = false;
			});
	}

	private addTodoList() {
		const dataObj = {
			name: this.newTodoListName,
		};

		console;
		axios
			.post(`/api/TodoLists`, dataObj)
			.then((res) => {
				this.addTodoListSubmitBtn.disabled = true;
				this.addTodoListSpinner.style.display = 'inline-block';
				console.log(res.data);
				this.todoLists.push(new TodoListData(res.data));
			})
			.catch((error) => console.log(error.response.data))
			.finally(() => {
				this.addTodoListSubmitBtn.disabled = false;
				this.addTodoListSpinner.style.display = 'none';
				this.addTodoListModal.style.display = 'none';
				this.newTodoListName = '';
			});
	}
}
</script>

<style scoped>
.add-todo-list-modal {
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
.add-todo-list-modal-content {
	background-color: #d6ffd9;
	margin: 15% auto;
	padding: 5em;
	border: 1px solid #888;
	width: 80%;
	box-sizing: border-box;
}

.add-todo-list-modal input {
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

.add-todo-list-submit-btn {
	display: block;
	padding: 1em 2em;
	background-color: #26925e;
	border: none;
	color: white;
	cursor: pointer;
}
.add-todo-list-submit-btn:hover {
	background-color: #1c7c4e;
}

.add-todo-list-spinner {
	display: none;
}
.close-todo-list-modal {
	color: #aaa;
	float: right;
	font-size: 2em;
	font-weight: bold;
	margin-bottom: 1em;
}
.close-todo-list-modal:hover,
.close-todo-list-modal:focus {
	color: black;
	text-decoration: none;
	cursor: pointer;
}

.todo-app {
	display: grid;
	grid-template-columns: 15em auto;
	background-color: #ceffeb; /*#7ee289*/
	border: 2px solid #7ee289;
	border-radius: 10px;
}

.todo-app-sidebar {
	background-color: #7ee289;
	border-radius: 10px 0 0 10px;
}

.sidebar-top {
	padding: 1.5em 0 2em;
	border-bottom: 2px solid #5ebe76;
}

.sidebar-bot {
	padding-right: 1em;
	padding-left: 0.5em;
}

.sidebar-bot ul {
	text-align: left;
}
.sidebar-bot li {
	margin-bottom: 1.5em;
	cursor: pointer;
}

.sidebar-bot li:hover {
	color: white;
}

.add-todo-list-btn {
	font-size: 2rem;
	color: #2c3e50;
	background-color: #7ee289;
	text-align: center;
	text-decoration: none;
	border: none;
	cursor: pointer;
}
.add-todo-list-btn :hover {
	color: white;
}

.add-todo-list-btn:active {
	background-color: #3fa236;
}
</style>
