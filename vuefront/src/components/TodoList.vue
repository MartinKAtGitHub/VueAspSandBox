<template>
	<div class="todo-list">
		<!-- Edit todo list modal -->
		<div id="editTodoListModal" class="todo-app-modal">
			<div class="todo-app-modal-content edit-modal">
				<div class="todo-app-modal-content-header">
					<h2>Edit Todo List</h2>
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
					<div
						id="todoListEditOptions"
						class="todo-list-edit-options"
					>
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
							class="delete-todo-list-btn"
							type="button"
							@click="confirmDeleteTodoList"
						>
							<fa-icon class="icon-del" icon="trash" /> Delete
							List
						</button>
					</div>
					<div
						id="todoListDelConfirm"
						class="todo-list-edit-delete-confirm"
					>
						<h3>Delete {{ todoList.listName }}?</h3>
						<div>
							<button
								id="deleteTodoListBtn"
								class="delete-todo-list-yes-btn"
								type="button"
								@click="confirmDeleteTodoListYes"
							>
								Yes
								<fa-icon
									id="deleteTodoListSpinner"
									class="delete-todo-list-spinner"
									icon="spinner"
									spin
								/>
							</button>
							<button
								class="delete-todo-list-no-btn"
								type="button"
								@click="confirmDeleteTodoListNo"
							>
								No
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<!-- Edit todo item modal -->
		<div id="editTodoItemModal" class="todo-app-modal">
			<div class="todo-app-modal-content edit-modal">
				<div class="todo-app-modal-content-header">
					<h2>Edit Todo</h2>
					<span
						@click="closeEditTodoItemModal"
						class="todo-app-modal-close"
						>&times;</span
					>
				</div>

				<form @submit.prevent="updateTodoItem(todoItemToEdit)">
					<input
						type="text"
						v-model="editTodoName"
						:placeholder="
							todoItemToEdit !== null
								? todoItemToEdit.defaultName
								: ''
						"
					/>
					<div
						id="todoItemEditOptions"
						class="todo-item-edit-options"
					>
						<button
							id="editTodoItemSubmitButton"
							class="edit-todo-item-submit-btn"
							type="submit"
						>
							Update Todo
							<!-- <fa-icon
								id="editTodoListSpinner"
								class="edit-todo-list-spinner"
								icon="spinner"
								spin
							/> -->
						</button>

						<button class="delete-todo-item-btn" type="button">
							<fa-icon class="icon-del" icon="trash" /> Delete
							Todo
						</button>
					</div>
					<div
						id="todoItemDelConfirm"
						class="todo-item-edit-delete-confirm"
					>
						<!-- <h3>Delete {{ todoList.listName }}?</h3> -->
						<div>
							<button
								id="deleteTodoItemBtn"
								class="delete-todo-Item-yes-btn"
								type="button"
							>
								Yes
								<fa-icon
									id="deleteTodoItemSpinner"
									class="delete-todo-Item-spinner"
									icon="spinner"
									spin
								/>
							</button>
							<button
								class="delete-todo-Item-no-btn"
								type="button"
							>
								No
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>

		<!-- Add new todo item modal -->
		<div id="addTodoModal" class="todo-app-modal">
			<div class="todo-app-modal-content">
				<div class="todo-app-modal-content-header">
					<h2>Add item</h2>
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
			<h1 @click="openEditTodoListModal">
				<!-- <fa-icon icon="wrench" /> {{ todoList.listName }} -->
				{{ todoList.listName }}
			</h1>
		</section>

		<section class="todo-items-container">
			<div v-if="todoList.todoItems.length > 0">
				<div v-bind:key="item.id" v-for="item in todoList.todoItems">
					<TodoItem
						:todo-item-data="item"
						v-on:delete-item-event="deleteTodoItem"
						v-on:change-todo-status-event="updateTodoItem"
						v-on:edit-todo-event="openEditTodoItemModal"
					/>
				</div>
			</div>
			<div v-else><h3>List is empty</h3></div>
			<button
				id="addTodoBtn"
				class="add-todo-item-btn"
				@click="openAddTodoModal"
			>
				<fa-icon icon="plus-circle" /> add item
			</button>
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

	private todoItemToEdit: TodoItemData | null = null;
	private editTodoName = '';

	private isLoading = true;

	private editTodoListModal!: HTMLDivElement;
	private editTodoListSubmitButton!: HTMLButtonElement;
	private editTodoListSpinner!: HTMLElement;

	private editTodoItemModal!: HTMLDivElement;
	private editTodoItemSubmitButton!: HTMLButtonElement;
	private editTodoItemSpinner!: HTMLElement;

	private deleteTodoListBtn!: HTMLButtonElement;
	private deleteTodoListSpinner!: HTMLElement;

	private addTodoSubmitBtn!: HTMLButtonElement;
	private addTodoModal!: HTMLDivElement;
	private addTodoSpinner!: HTMLElement;

	private todoListEditOptions!: HTMLDivElement;
	private todoListDelConfirm!: HTMLDivElement;

	@Prop() todoList!: TodoListData | null;

	// lifecycle hook
	created() {
		//this.getListItems();
	}

	mounted() {
		this.todoListEditOptions = document.getElementById(
			'todoListEditOptions'
		) as HTMLDivElement;
		this.todoListDelConfirm = document.getElementById(
			'todoListDelConfirm'
		) as HTMLDivElement;

		this.deleteTodoListBtn = document.getElementById(
			'deleteTodoListBtn'
		) as HTMLButtonElement;
		this.deleteTodoListSpinner = document.getElementById(
			'deleteTodoListSpinner'
		) as HTMLElement;

		this.editTodoListModal = document.getElementById(
			'editTodoListModal'
		) as HTMLDivElement;
		this.editTodoListSubmitButton = document.getElementById(
			'editTodoListSubmitButton'
		) as HTMLButtonElement;
		this.editTodoListSpinner = document.getElementById(
			'editTodoListSpinner'
		) as HTMLElement;

		this.editTodoItemModal = document.getElementById(
			'editTodoItemModal'
		) as HTMLDivElement;

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
		this.confirmDeleteTodoListNo();
	}
	private openEditTodoItemModal(activeTodo: TodoItemData) {
		this.editTodoItemModal.style.display = 'block';
		this.todoItemToEdit = activeTodo;
	}
	private closeEditTodoItemModal(activeTodo: TodoItemData) {
		this.editTodoItemModal.style.display = 'none';
		this.todoItemToEdit = null;
	}

	private openAddTodoModal() {
		this.addTodoModal.style.display = 'block';
	}

	private closeAddTodoModal() {
		this.addTodoModal.style.display = 'none';
	}

	private confirmDeleteTodoList() {
		this.todoListEditOptions.style.display = 'none';
		this.todoListDelConfirm.style.display = 'block';
	}
	private confirmDeleteTodoListYes() {
		this.deleteTodoList();
	}

	private confirmDeleteTodoListNo() {
		this.todoListEditOptions.style.display = 'flex';
		this.todoListDelConfirm.style.display = 'none';
	}

	// post
	private addTodoItem(e: Event) {
		e.preventDefault();

		this.addTodoSubmitBtn.disabled = true;
		this.addTodoSpinner.style.display = 'inline-block';

		const dataObj = {
			name: this.newTodoItemName,
			desc: this.newTodoItemDesc,
			isComplete: this.newTodoItemIsComplete,
			todoListId: this.todoList?.id,
		};
		axios
			.post(`/api/TodoItems/`, dataObj)
			.then((res) => {
				//this.todoItems.push(new TodoItemData(res.data));
				this.todoList?.todoItems.push(new TodoItemData(res.data)); //TODO #31 block req

				//small delay, might remove it
				//return new Promise((resolve) => setTimeout(resolve, 1000));
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
		delBtn.disabled = true;

		axios
			.delete(`/api/TodoItems/${item.id}`)
			.then((res) => {
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
	private updateTodoItem(item: TodoItemData) {
		if (this.editTodoName !== '') {
			item.itemName = this.editTodoName;
		}

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
				console.log(error);
				//location.reload(); // Don't think this is the best idea
				item.resetDefault(); // hmm
			})
			.finally(() => {
				this.editTodoName = '';
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
						this.closeEditTodoListModal();
					}
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					this.editTodoListSubmitButton.disabled = false;
					this.editTodoListSpinner.style.display = 'none';
				});
		} else {
			console.error('Todo list is NULL, but you are trying to edit it');
		}
	}
	// Del list
	private deleteTodoList() {
		this.deleteTodoListSpinner.style.display = 'inline-block';
		this.deleteTodoListBtn.disabled = true;
		axios
			.delete(`/api/TodoLists/${this.todoList?.id}`)
			.then((res) => {
				this.closeEditTodoListModal();
				this.$emit('on-delete-list', this.todoList);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				this.deleteTodoListSpinner.style.display = 'none';
				this.deleteTodoListBtn.disabled = false;
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

.todo-list-edit-options,
.todo-item-edit-options {
	display: flex;
	justify-content: space-between;
}
.todo-list-edit-delete-confirm,
.todo-item-edit-delete-confirm {
	display: none;
	background-color: rgba(255, 174, 0, 0.733);
	padding: 2em;
}
.todo-list-edit-delete-confirm div,
.todo-item-edit-delete-confirm div {
	display: flex;
	justify-content: space-evenly;
}

.edit-modal input {
	border-bottom: 2px solid #6878d2;
	color: #2c3e50;
}

.add-todo-submit-btn,
.edit-todo-list-submit-btn,
.edit-todo-item-submit-btn,
.delete-todo-list-btn,
.delete-todo-list-yes-btn,
.delete-todo-list-no-btn,
.delete-todo-item-btn,
.delete-todo-item-yes-btn,
.delete-todo-item-no-btn {
	display: block;
	padding: 1em 2em;
	border: none;
	color: white;
	cursor: pointer;
	min-width: 9em;
	min-height: 4em;
}
.edit-todo-list-submit-btn,
.edit-todo-item-submit-btn {
	background-color: #5282c2;
}
.delete-todo-list-btn,
.delete-todo-item-btn {
	background-color: #d63a3a;
}
.delete-todo-list-yes-btn,
.delete-todo-item-yes-btn {
	background-color: #d63a3a;
	margin: auto;
}
.delete-todo-list-no-btn,
.delete-todo-item-no-btn {
	background-color: #29e23c;
	margin: auto;
}

.add-todo-submit-btn {
	background-color: #26925e;
}

.add-todo-submit-btn:hover {
	background-color: #1c7c4e;
}

.add-todo-submit-btn:disabled {
	background-color: #1a5e58;
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

.add-todo-spinner,
.edit-todo-list-spinner,
.delete-todo-list-spinner {
	display: none;
}
</style>
