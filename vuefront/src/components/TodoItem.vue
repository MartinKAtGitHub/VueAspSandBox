<template>
	<div class="todo-item">
		<label class="checkbox-container">
			<input
				v-bind:id="`todoItemCheckbox_${todoItemData.id}`"
				type="checkbox"
				v-model="todoItemData.isComplete"
			/>
			<fa-icon class="checkbox-icon checked" icon="check-circle" />
			<fa-icon
				class="checkbox-icon unchecked"
				:icon="['fas', 'circle']"
			/>
		</label>

		<!-- <h3 class="todo-item-name">{{ todoItemData.itemName }}</h3> -->
		<form
			v-bind:id="`todoItemNameForm_${todoItemData.id}`"
			@submit="editTodoItem"
			class="todo-item-name"
		>
			<input
				v-bind:id="`todoItemNameInput_${todoItemData.id}`"
				v-bind:class="{'todo-completed': todoItemData.isComplete}"
				class="todo-item-name-input"
				type="text"
				v-model="todoItemData.itemName"
			/>

			<!--Do i need this func with a todo list-->
			<!-- <textarea
				class="todo-item-name-input"
				v-model="todoItemData.itemName"
			>
			</textarea> -->
		</form>

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

	mounted() {
		this.onCompletedUpdate();
		this.resetInputOnBlur(this.todoItemData.itemName);
	}

	private onCompletedUpdate() {
		const checkbox = document.getElementById(
			`todoItemCheckbox_${this.todoItemData.id}`
		) as HTMLInputElement;

		checkbox.onchange = () => {
			this.editTodoItem();
		};
	}
	private resetInputOnBlur(currentName: string) {
		const input = document.getElementById(
			`todoItemNameInput_${this.todoItemData.id}`
		) as HTMLInputElement;

		input.onblur = () => {
			input.value = currentName;
		};
	}

	public deleteItemSignal(e: Event) {
		var btn = e.target as HTMLButtonElement;
		this.$emit('delete-item-event', this.todoItemData, btn);
	}
	public editTodoItem() {
		this.resetInputOnBlur(this.todoItemData.itemName);
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
	flex: 1;
	margin-left: 2em;
	margin-right: 2em;
	min-width: 0;
}

.todo-item-name-input {
	outline: none;
	display: block;
	padding: 1em 1em 0.5em 1em;
	background: none;
	border: 1px solid transparent;
	width: 100%;
	box-sizing: border-box;
	font-size: 1.17em;
	margin: 1em 0 1em 0;
	text-overflow: ellipsis;
}

.todo-item-name-input:focus {
	border-bottom: 2px solid #249090;
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
	cursor: pointer;
}

.todo-item-del-btn:hover {
	background-color: #7a1212;
}

.todo-item-del-btn:disabled {
	border: 1px solid #999999;
	background-color: #cccccc;
	color: #666666;
}

.todo-completed {
	text-decoration: line-through;
}

.checkbox-icon {
	width: 2em;
	height: 2em;
	color: #0066ff;
	pointer-events: none;
}
.icon-del {
	width: 2em;
	height: 2em;
	color: #ffffff;
	pointer-events: none;
}

.checkbox-container {
	display: block;
	cursor: pointer;
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
