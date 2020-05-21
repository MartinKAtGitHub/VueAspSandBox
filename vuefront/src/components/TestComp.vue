<template>
	<div class="testcomp">
		<h1>{{ testCompTitle }}</h1>
		<h1>{{ testCompData }}</h1>
	</div>
</template>

<script lang="ts">
import {Prop, Vue, Component} from 'vue-property-decorator';

@Component
export default class TestComp extends Vue {
	@Prop({default: 'Enter value', type: String})
	private readonly testCompTitle!: string;

	compName(): string {
		return 'Test Comp';
	}

	data() {
		return {
			testCompData: 'Some data from test comp',
		};
	}
}
</script>
