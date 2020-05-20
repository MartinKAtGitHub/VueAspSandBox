<template>
	<div class="about">
		<h1>This is an about page</h1>
		<TestComp testCompTitle="Nice" />
	</div>
</template>

<script>
// @ is an alias to /src
import TestComp from '@/components/TestComp.vue';

export default {
	name: 'About',
	components: {
		TestComp,
	},
};
</script>

<style scoped>
h1 {
	color: blue;
}
</style>
