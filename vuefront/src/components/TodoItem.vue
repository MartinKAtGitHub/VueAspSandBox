<template>
	<div class="todo-item">
		<form @submit="editTodoItem">
			<div class="item-isComplete-container">
				<input type="checkbox" v-model="todoItemData.isComplete" />
			</div>
			<div class="item-name-container">
				<input type="text" v-model="todoItemData.itemName" />
				<!-- <h3>{{ todoItemData.itemName }}</h3> -->
			</div>
			<div class="item-desc-container">
				<input type="text" v-model="todoItemData.itemDesc" />
				<!-- <p>{{ todoItemData.itemDesc }}</p> -->
			</div>
			<input type="submit" />
		</form>

		<button @click="deleteItemSignal" class="todo-del-btn">Delete</button>
	</div>
</template>

<script lang="ts">
import {Prop, Vue, Component} from 'vue-property-decorator';
import {TodoItemData} from '../Models/TodoItemData';
@Component
export default class TodoItem extends Vue {
	@Prop(TodoItemData) todoItemData!: TodoItemData;

	public deleteItemSignal() {
		this.$emit('delete-item-event', this.todoItemData);
	}
	public editTodoItem(e: Event) {
		e.preventDefault();
		this.$emit('edit-item-event', this.todoItemData);
	}
}
</script>

<style scoped>
.todo-item {
	display: flex;
	align-items: center;
	height: 100px;

	background-color: rgb(18, 80, 109);
	color: black;
	margin-bottom: 15px;
}
.todo-item > form > div {
	margin-left: 10px;
	padding: 10px;
}
.todo-item > form {
	display: flex;
	align-items: center;

	flex-grow: 1;
}

.item-name-container {
	border-right: 1px solid rgb(6, 3, 26);
}
.item-desc-container {
	flex-grow: 1;
}
.todo-del-btn {
	width: 80px;
	height: 100%;
	background-color: #ef1111;
	border-color: #d24343;
}
</style>
