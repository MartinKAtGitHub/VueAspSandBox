<template>
	<div class="sandbox">
		<TestComp testCompTitle="TestComp New Value" />
		<!-- Vue is a 2 way live update system -->
		<div class="live-update">
			<h4>{{ liveupdate }}</h4>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import TestComp from '@/components/TestComp.vue';

export default {
	name: 'Sandbox',
	data: function() {
		return {
			liveupdate: 'liveupdate',
		};
	},
	components: {
		TestComp,
	},
};
</script>

<style scoped>
h1 {
	color: rgb(17, 209, 65);
}

.sandbox {
	margin-top: 50px;
}
</style>
