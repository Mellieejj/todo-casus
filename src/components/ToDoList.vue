<script setup lang="ts">
import TodoItem from "@/components/TodoItem.vue";
import type { Todo } from "@/stores/todos.ts";
import Container from '@/components/general/Container.vue';

const {todos} = defineProps<{todos: Todo[]}>()

</script>

<template>
	<Container customClasses="">
	<TodoItem v-for="todo in todos" :key="todo.id" :todo="todo"/>

	</Container>



</template>

<style scoped></style>
