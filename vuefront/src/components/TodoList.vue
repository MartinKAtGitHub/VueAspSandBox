<template>
	<div class="todo-list">
		<section class="todo-item-container" v-if="isTodoListDataLoaded">
			<!-- <div id="addTodoContainer">
				<p>Add new Todo</p>
				<form @submit="addTodoItem">
					<input
						type="text"
						v-model="newTodoItemName"
						name="newTodoItemName"
					/>
					<input
						type="text"
						v-model="newTodoItemDesc"
						name="newTodoItemDesc"
					/>
					<input type="submit" />
				</form>
			</div> -->

			<div v-if="isLoading">
				Loading data <fa-icon icon="spinner" spin />
			</div>
			<div v-else v-bind:key="item.id" v-for="item in todoItems">
				<TodoItem
					:todo-item-data="item"
					v-on:delete-item-event="deleteTodoItem"
					v-on:edit-item-event="editTodoItem"
				/>
			</div>
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

	// lifecycle hook, fires of depending on the stage of vue
	mounted() {
		this.getListItems();
		// this.devMode();
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
				this.todoItems.push(new TodoItemData(res.data));
				this.newTodoItemName = '';
				this.newTodoItemDesc = '';
			})
			.catch((error) => console.log(error.response.data));
	}

	//delete
	private deleteTodoItem(item: TodoItemData) {
		axios
			.delete(`/api/TodoItems/${item.id}`)
			.then((res) => {
				this.todoItems.splice(this.todoItems.indexOf(item), 1);
			})
			.catch((error) => console.log(error.response.data));
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
			.catch((error) => console.log(error.response.data));
	}
}
</script>

<style scoped>
#addTodoContainer {
	background-color: crimson;
	margin: 0 0 1em;
	padding: 1em;
}
#addTodoContainer p {
	margin: 0 0 1em;
}
.todo-list {
	padding: 0.5em;
}

.todo-item-container {
	background-color: #68d282;
	border-radius: 10px;
}
</style>
