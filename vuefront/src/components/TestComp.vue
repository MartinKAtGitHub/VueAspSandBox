<template>
	<h1>{{ testCompTitle }}</h1>
</template>

<script lang="ts">
import {Prop, Vue, Component} from 'vue-property-decorator';
@Component
export default class TestComp extends Vue {
	@Prop() private testCompTitle!: string;
}
</script>
