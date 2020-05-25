<!--This would be more of a view, but i will embed this in the sandbox view for now-->
<template>
	<div class="todo-list">
		<div id="addTodoContainer">
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
		</div>
		<div v-bind:key="item.id" v-for="item in todoItems">
			<TodoItem
				:todo-item-data="item"
				v-on:delete-item-event="deleteTodoItem"
				v-on:edit-item-event="editTodoItem"
			/>
		</div>
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
	private newTodoItemName: string = '';
	private newTodoItemDesc: string = '';
	private newTodoItemIsComplete: boolean = false;

	todoItems: TodoItemData[] = [];

	// lifecycle hook, fires of depending on the stage of vue
	created() {
		this.getListItems();
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
			.catch((error) => console.log(error.response.data));
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
	margin-bottom: 50px;
}

.todo-list {
	min-height: 100px;
	background-color: chartreuse;
}
</style>
