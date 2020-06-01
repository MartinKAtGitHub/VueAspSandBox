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
						Another todo List (WIP)
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
}

.sidebar-bot ul {
	text-align: left;
}
.sidebar-bot li {
	margin-bottom: 0.5em;
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
</style>
