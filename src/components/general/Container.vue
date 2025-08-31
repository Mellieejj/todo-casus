<script setup lang="ts">
const {customClasses} = defineProps<{customClasses?: string}>()

const classes = `w-full rounded-xl flex flex-col ${customClasses ? customClasses : ''}`;
</script>

<template>
	<div :class="classes">
		<slot></slot>
	</div>
</template>

<style scoped></style>
