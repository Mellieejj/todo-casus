import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { DateTime } from "luxon";

export const useTodosStore = defineStore('todos', () => {
	let id = 0;

	const todos = ref<Todo[]>([{
		id: id,
		title: "Test Todo",
		createdAtDate: DateTime.now(),
		finished: false
	},
		{
			id: ++id,
			title: "Test Todo 2" ,
			createdAtDate: DateTime.now(),
			finished: true,
			finishedAtDate: DateTime.now(),
			deadlineDate: DateTime.now().plus({days: 2})
		}])

	const addNewTodo = (todo: {title: string, deadlineDate?: string}) => {
		const newTodo: Todo = {
			id: id++,
			title: todo.title,
			deadlineDate: todo.deadlineDate ? DateTime.fromFormat(todo.deadlineDate, 'yyyy-MM-dd') : undefined,
			createdAtDate: DateTime.now(),
			finished: false,
		}
		todos.value.push(newTodo)
	}

	const removeTodo = (id: number) => {
		todos.value.filter(t => t.id !== id)
	}

	return { todos, addNewTodo, removeTodo }
})

export type Todo = {
	id: number;
	title: string;
	deadlineDate?: DateTime;
	createdAtDate: DateTime
	finished: boolean;
	finishedAtDate?: DateTime;
}

export type TodoFormFields = {
	title: string;
	deadlineDate?: DateTime;
}