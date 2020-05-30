<template>
	<div class="sandbox">
		<!-- <TestComp test-comp-title="TestComp New Value" /> -->
		<!-- Vue is a 2 way live update system -->

		<div class="live-update">
			<h2>{{ pageTitle }}</h2>
		</div>
		<!-- <button v-on:click="getWeatherData">Get Data</button> -->

		<TodoList />
	</div>
</template>

<script lang="ts">
// @ is an alias to /src
import axios from 'axios';
import TestComp from '@/components/TestComp.vue';
import TodoList from '@/components/TodoList.vue';
import {Component, Vue} from 'vue-property-decorator';

@Component({
	components: {
		TestComp,
		TodoList,
	},
})
export default class Sandbox extends Vue {
	private readonly pageTitle = 'Sandbox page';

	getWeatherData() {
		console.log('Get weather data');
		axios.get('/api/weatherforecast').then((res) => {
			console.log(res.data);
		});
	}
}

// This is the JS way
// export default {
// 	name: 'Sandbox',
// 	data: function() {
// 		return {
// 			pageTitle: 'liveupdate',
// 		};
// 	},
// 	components: {
// 		TestComp,
// 	},
// };
</script>

<style scoped>
h1 {
	color: rgb(17, 209, 65);
}

.sandbox {
	margin-top: 50px;
}
</style>
