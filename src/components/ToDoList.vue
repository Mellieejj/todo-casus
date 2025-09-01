<script lang="ts" setup>
import TodoItem from '@/components/TodoItem.vue';
import { type Todo, useTodosStore } from '@/stores/todos.ts';
import Container from '@/components/general/Container.vue';
import { computed, onMounted } from 'vue';
import { DateTime } from 'luxon';

const { todos, emptyListText, listName } = defineProps<{
	todos: Todo[];
	emptyListText?: string;
	listName: 'finished' | 'todo';
}>();
const { onDropTodo } = useTodosStore();

const todosDeadlineAlert = computed(() =>
	todos.filter(
		todo =>
			todo.deadlineDate &&
			!todo.finished &&
			(todo.deadlineDate === DateTime.now().startOf('day') || todo.deadlineDate < DateTime.now().startOf('day')),
	),
);

onMounted(() => {
	todosDeadlineAlert.value.length > 0 &&
		alert(`Let op! Verval datum van ${todosDeadlineAlert.value.length} todo is verlopen of vandaag!`);
});

const overtimeClass = 'border border-red-600';
</script>

<template>
	<Container customClasses="gap-3" @drop="onDropTodo($event, listName)" @dragenter.prevent @dragover.prevent>
		<p v-if="emptyListText && todos.length < 1" class="text-sm text-slate-400 text-center p-4">
			{{ emptyListText }}
		</p>
		<TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
	</Container>
</template>
