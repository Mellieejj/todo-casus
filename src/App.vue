<script lang="ts" setup>
import ToDoList from '@/components/ToDoList.vue';
import { type Todo, useTodosStore } from '@/stores/todos.ts';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import HeaderColumn from '@/components/general/HeaderColumn.vue';
import AddNewTodo from '@/components/AddNewTodo.vue';

const todoStore = useTodosStore();

const { todos } = storeToRefs(todoStore);

const filteredTodos = computed(() => {
	const finishedTodos = todos.value.filter(t => t.finished);

	const notFinishedTodos = todos.value.filter(t => !t.finished);
	return { finishedTodos, notFinishedTodos };
});

const onRemoveClick = (todo: Todo) => {
	if (window.confirm(`Weet je zeker dat je '${todo.title}' wilt verwijderen?`)) {
		todoStore.removeTodo(todo.id);
	}
};
</script>

<template>
	<div class="place-items-center lg:p-6 p-2 grid lg:gap-6 gap-2">
		<div class="lg:w-1/2 w-full bg-white p-6 rounded-xl">
			<AddNewTodo />
		</div>

		<div class="grid lg:grid-cols-2 lg:gap-4 gap-6 lg:w-1/2 w-full bg-white p-6 rounded-xl">
			<div>
				<HeaderColumn title="To Do" />
				<ToDoList
					:todos="filteredTodos.notFinishedTodos"
					emptyListText="🎉 Gefeliciteerd alle todo's zijn afgevinkt! "
				/>
			</div>

			<div>
				<HeaderColumn title="Finished" />
				<ToDoList :todos="filteredTodos.finishedTodos" emptyListText="Nog geen todo's afgevinkt! 🙁" />
			</div>
		</div>
	</div>
</template>
