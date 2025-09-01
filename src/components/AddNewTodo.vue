<script setup lang="ts">
import Container from '@/components/general/Container.vue';
import { ref } from 'vue';
import { useTodosStore } from '@/stores/todos.ts';
import { DateTime } from 'luxon';

const todosStore = useTodosStore();
const { addNewTodo } = todosStore;

const newTodoForm = ref({
	title: '',
	deadlineDate: undefined,
});

const add = () => {
	addNewTodo(newTodoForm.value);
	newTodoForm.value.title = '';
	newTodoForm.value.deadlineDate = undefined;
};

const inputClass = 'border p-2 rounded-sm border-teal-500  placeholder-slate-300::placeholder caret-teal-500';
const labelClass = 'text-slate-400 text-sm';
const minDate = DateTime.now().toFormat('yyyy-MM-dd');
</script>

<template>
	<Container customClasses="items-center">
		<form @submit.prevent="add" class="flex flex-col gap-3 w-1/2">
			<label for="title" :class="labelClass">Todo</label>
			<input
				id="title"
				:class="inputClass"
				type="text"
				v-model="newTodoForm.title"
				placeholder="Wat te doen?"
				required />

			<label for="deadlineDate" :class="labelClass">Is er een vervaldatum?</label>
			<input id="deadlineDate" :class="inputClass" type="date" v-model="newTodoForm.deadlineDate" :min="minDate" />

			<div class="flex justify-center w-full">
				<button
					title="Toevoegen"
					class="rounded-xl color-white bg-teal-500 hover:bg-teal-900 py-4 px-8 w-fit"
					type="submit">
					Toevoegen
				</button>
			</div>
		</form>
	</Container>
</template>
