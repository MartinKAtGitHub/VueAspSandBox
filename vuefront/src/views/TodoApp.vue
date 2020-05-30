<template>
	<div class="todo-app">
		<section class="todo-app-sidebar">
			<div class="sidebar-top">
				<button class="add-todo-list-btn">
					<fa-icon icon="plus-circle" />
				</button>
			</div>
			<div class="sidebar-bot">
				<ul class="fa-ul">
					<li>
						<span class="fa-li"><fa-icon icon="list-ul"/></span>
						Small name text
					</li>
					<li>
						<span class="fa-li"><fa-icon icon="list-ul"/></span>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Delectus, quasi?
					</li>
				</ul>
			</div>
		</section>
		<section class="todo-app-main">
			<div class="todo-app-main-top">
				<h1>List name</h1>
				<h3><fa-icon icon="plus-circle" /> add item</h3>
			</div>

			<TodoList />
		</section>
	</div>
</template>

<script lang="ts">
import TodoList from '@/components/TodoList.vue';
import {Component, Vue} from 'vue-property-decorator';

@Component({
	components: {
		TodoList,
	},
})
export default class TodoApp extends Vue {
	private readonly pageTitle = 'Todo App';
}
</script>

<style scoped>
.todo-app {
	display: grid;
	grid-template-columns: 15% auto;
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
.add-todo-list-btn {
	font-size: 2rem;
	color: white;
	background-color: #7ee289;
	text-align: center;
	text-decoration: none;
	border: none;
}
.add-todo-list-btn :hover {
	color: rgb(196, 184, 184);
}

.add-todo-list-btn:active {
	background-color: #3fa236;
}

.sidebar-bot ul {
	text-align: left;
}
.sidebar-bot li {
	margin-bottom: 0.5em;
}

.todo-app-main-top {
	display: flex;
	justify-content: space-between;
	padding: 0 2.5em;
}
</style>
