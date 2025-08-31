<script setup lang="ts">
import ToDoList from "@/components/ToDoList.vue";
import { useTodosStore } from "@/stores/todos.ts";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import HeaderColumn from "@/components/HeaderColumn.vue";
import AddNewTodo from "@/components/AddNewTodo.vue";

// let id = 0
//
// const newTodo = ref('')
// const hideCompleted = ref(false)
// const todos = ref([
// 	{ id: id++, text: 'Learn HTML', done: true },
// 	{ id: id++, text: 'Learn JavaScript', done: true },
// 	{ id: id++, text: 'Learn Vue', done: false }
// ])
//
// const filteredTodos = computed(() => {
// 	return hideCompleted.value
// 		? todos.value.filter((t) => !t.done)
// 		: todos.value
// })
//
// function addTodo() {
// 	todos.value.push({ id: id++, text: newTodo.value, done: false })
// 	newTodo.value = ''
// }
//
// function removeTodo(todoId) {
// 	todos.value.filter(t => t.id !== todoId)
// }


const todoStore = useTodosStore();

const {todos} = storeToRefs(todoStore)

const filteredTodos = computed(() => {
	const finishedTodos = todos.value.filter(t => t.finished);

	const notFinishedTodos = todos.value.filter(t => !t.finished);
	return {finishedTodos, notFinishedTodos};
})

</script>

<template>
	<div class="w-full place-items-center p-6 grid gap-6">
<div class="lg:w-1/2 w-full">
			<AddNewTodo />
</div>

		<div class="grid lg:grid-cols-2 lg:gap-4 gap-6 lg:w-1/2 w-full">
			<div>
			<HeaderColumn title="To Do" />
				<ToDoList :todos="filteredTodos.notFinishedTodos" />
			</div>

			<div>
				<HeaderColumn title="Finished" />
				<ToDoList :todos="filteredTodos.finishedTodos" />
			</div>
		</div>




<!--	<form @submit.prevent="addTodo">-->
<!--		<input v-model="newTodo" required placeholder="new todo">-->
<!--		<button>Add Todo</button>-->
<!--	</form>-->
<!--	<ul>-->
<!--		<li v-for="todo in filteredTodos" :key="todo.id">-->
<!--			<input type="checkbox" v-model="todo.done">-->
<!--			<span :class="{ done: todo.done }">{{ todo.text }}</span>-->
<!--			<button @click="removeTodo(todo.id)">X</button>-->
<!--		</li>-->
<!--	</ul>-->
<!--	<button @click="hideCompleted = !hideCompleted">-->
<!--		{{ hideCompleted ? 'Show all' : 'Hide completed' }}-->
<!--	</button>-->
	</div>
</template>

<style scoped>
.done {
	text-decoration: line-through;
}
</style>

