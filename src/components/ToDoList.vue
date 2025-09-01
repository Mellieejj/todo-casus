<script lang="ts" setup>
import TodoItem from '@/components/TodoItem.vue';
import type { Todo } from '@/stores/todos.ts';
import Container from '@/components/general/Container.vue';

const { todos, emptyListText } = defineProps<{ todos: Todo[]; emptyListText?: string}>();
</script>

<template>
	<Container customClasses="gap-3">
		<p class="text-sm text-slate-400 text-center" v-if="emptyListText && todos.length < 1">
			{{ emptyListText }}
		</p>
		<TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
	</Container>
</template>
