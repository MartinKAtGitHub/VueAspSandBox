<template>
	<div id="app">
		<div id="nav">
			<router-link to="/todoApp">Todo app</router-link> |
			<router-link to="/githubsearch">GitHub Search</router-link> |
			<router-link to="/sandbox">My Sandbox</router-link> |
			<router-link to="/about">About</router-link> |
			<router-link to="/">Home</router-link> |
		</div>
		<router-view />
	</div>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}
</style>
