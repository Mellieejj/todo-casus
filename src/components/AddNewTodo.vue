<script setup lang="ts">
import Container from "@/components/general/Container.vue";
import { ref } from "vue";
import { useTodosStore } from "@/stores/todos.ts";
import HeaderColumn from '@/components/HeaderColumn.vue';

const todosStore = useTodosStore();
const {addNewTodo} = todosStore

const newTodoForm = ref({
	title: "",
	deadlineDate: undefined
})

const add = () => {
	addNewTodo(newTodoForm.value)
	newTodoForm.value.title = "";
	newTodoForm.value.deadlineDate = undefined
}

const inputClass = "border-[1px] p-2 rounded-sm border-teal-500"
</script>

<template>
	<Container customClasses="items-center">
		<HeaderColumn	 title="Nieuwe todo toevoegen"/>
	<form @submit.prevent="add" class="flex flex-col gap-3 mb-4 w-1/2">
		<input :class="inputClass" type="text" v-model="newTodoForm.title" placeholder="Wat te doen?" required />
		<input :class="inputClass" type="date" v-model="newTodoForm.deadlineDate" />
		<button class="rounded-xl color-white bg-teal-500 hover:bg-teal-900 py-4 px-8 w-fit" type="submit">Toevoegen</button>
	</form>

	</Container>
</template>

<style scoped></style>
