<template>
	<div class="todo-item">
		<!-- <form @submit="editTodoItem">
			<div class="item-isComplete-container">
				<input type="checkbox" v-model="todoItemData.isComplete" />
			</div>
			<div class="item-name-container">
				<input type="text" v-model="todoItemData.itemName" />
			</div>
			<div class="item-desc-container">
				<input type="text" v-model="todoItemData.itemDesc" />
			</div>
			<input type="submit" />
		</form> -->

		<!--Submit on value change-->
		<form class="todo-item-checkbox-form" @submit="editTodoItem">
			<label class="checkbox-container">
				<input type="checkbox" v-model="todoItemData.isComplete" />
				<fa-icon class="checkbox-icon checked" icon="check-circle" />
				<fa-icon
					class="checkbox-icon unchecked"
					:icon="['fas', 'circle']"
				/>
			</label>
		</form>
		<h3 class="todo-item-name">{{ todoItemData.itemName }}</h3>
		<button class="todo-item-del-btn" @click="deleteItemSignal">
			<fa-icon class="icon-del" icon="trash" />
		</button>
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
	/* justify-content: space-between; */
	align-items: center;
	padding: 0 2em 0;
	min-height: 100px;
	border-bottom: 1px solid #5c947c;
}

.todo-item-name {
	margin-left: 2em;
	margin-right: 2em;
	/* max-width: 80%; */
	min-width: 0;
}

.item-name-container {
	border-right: 1px solid rgb(6, 3, 26);
}
.item-desc-container {
	flex-grow: 1;
}
.todo-item-del-btn {
	margin-left: auto;
	width: 3em;
	height: 3em;
	background-color: #ef1111;
	border: none;
	border-radius: 50%;
}

.checkbox-icon {
	width: 2em;
	height: 2em;
	color: #0066ff;
}
.icon-del {
	width: 2em;
	height: 2em;
	color: #ffffff;
}

.checkbox-container input,
.checkbox-container .checked {
	display: none;
}

.checkbox-container input:checked ~ .checked {
	display: inline-block;
	color: #0066ff;
}

.checkbox-container input:checked ~ .unchecked {
	display: none;
}
</style>
