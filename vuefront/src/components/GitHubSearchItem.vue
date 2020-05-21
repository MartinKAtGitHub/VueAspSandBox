<template>
	<div class="github-search-item">
		<div class="card">
			<img v-bind:src="userAvatarUrl" alt="GitHub Avatar" />
			<div class="container">
				<h4>
					<b>{{ username }}</b>
				</h4>
				<a v-bind:href="profileUrl">Profile</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {Prop, Vue, Component} from 'vue-property-decorator';

@Component
export default class GitHubSearchItem extends Vue {
	@Prop() username!: string;
	@Prop() userAvatarUrl!: string;
	@Prop() profileUrl!: string;

	// private _username: string = '';
	// private _userAvatarUrl: string = '';
	// private _profileUrl: string = '';
}
</script>

<style scoped>
.github-search-item {
	margin: 15px;
}
.card {
	/* Add shadows to create the "card" effect */
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	transition: 0.3s;
	width: 200px;
	height: 300px;
}
.card > img {
	width: 100%;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
	box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

/* Add some padding inside the card container */
.container {
	padding: 2px 16px;
}
</style>
