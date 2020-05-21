<template>
	<!-- Search for users using the GitHub Web API. -->
	<div class="github-api-search">
		<div class="page-info">
			<h1>{{ pageTitle }}</h1>
			<p>This page uses the GitHub WebAPI</p>
			<p>Returns back 30 profiles based on the username you search for</p>
		</div>
		<div class="search-input-section">
			<form @submit="searchGitHub">
				<input
					v-model="searchString"
					type="text"
					name="search-string"
					placeholder="username"
				/>
				<button type="submit">Search</button>
			</form>
		</div>
		<!-- <button v-on:click="searchGitHub">Search</button> -->
		<div class="result-grid">
			<div v-bind:key="item.login" v-for="item in searchResult">
				<GitHubSearchItem
					:username="item.login"
					:userAvatarUrl="item.avatar_url"
					:profileUrl="item.html_url"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import axios from 'axios';
import GitHubSearchItem from '../components/GitHubSearchItem.vue';
import {Component, Vue} from 'vue-property-decorator';

interface result {
	login: string;
	avatar_url: string;
	html_url: string;
}

@Component({
	// Don't need to do this, the class name is enough
	name: 'GitHubAPISearch',
	components: {
		GitHubSearchItem,
	},
})
export default class GitHubAPISearch extends Vue {
	private readonly pageTitle = 'Search users on GitHub using user names';
	private searchString = '';
	private searchResult: result[] = [];

	private searchGitHub(e: Event) {
		e.preventDefault();

		if (this.searchString !== '') {
			axios
				.get(
					`https://api.github.com/search/users?q=${this.searchString}`
				)
				.then((result) => {
					this.searchResult = result.data.items;
				});

			// this.searchString = '';
		} else {
			console.log('Display error message');
		}
	}
}
</script>

<style scoped>
h1 {
	color: rgb(43, 144, 226);
}
.result-grid {
	display: flex;
	flex-wrap: wrap;
}
.page-info {
	margin-bottom: 30px;
}
.search-input-section {
	margin-bottom: 30px;
}
</style>
