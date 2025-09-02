import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { DateTime } from 'luxon';
import { retrieveTodosFromStorage, saveToLocalStorage } from '@/util/localStorage.ts';

export const useTodosStore = defineStore('todos', () => {
	let id = 0;

	const todos = ref<Todo[]>([]);

	todos.value = retrieveTodosFromStorage();

	const addNewTodo = (todo: { title: string; deadlineDate?: string }) => {
		const newTodo: Todo = {
			id: id++,
			title: todo.title,
			deadlineDate: todo.deadlineDate ? DateTime.fromFormat(todo.deadlineDate, 'yyyy-MM-dd') : undefined,
			createdAtDate: DateTime.now(),
			finished: false,
		};

		todos.value.push(newTodo);
	};

	const removeTodo = (id: number) => {
		const findTodo = todos.value.find(t => t.id === id);

		if (findTodo && confirm(`Weet je zeker dat je '${findTodo.title}' wilt verwijderen?`)) {
			todos.value = todos.value.filter(t => t.id !== id);
		}
	};

	const toggleFinished = (id: number) => {
		todos.value.map(t => {
			if (t.id === id) {
				t.finished = !t.finished;
			}

			return t;
		});
	};

	const startDraggingTodo = (event: DragEvent, item: Todo) => {
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.setData('itemId', item.id.toString());
		}
	};

	const onDropTodo = (event: DragEvent, listName: 'finished' | 'todo') => {
		const id = Number(event.dataTransfer?.getData('itemId'));
		const todoItem = todos.value.find(t => t.id === id);

		return todos.value.map(t => {
			if (t.id === id) {
				if (listName === 'finished') {
					t.finished = true;
					t.finishedAtDate = DateTime.now();
				} else {
					t.finishedAtDate = undefined;
					t.finished = false;
				}
			}

			return t;
		});
	};

	const sortedTodos = computed(() => {
		const sortedTodos = todos.value.sort((todoA, todoB) => {
			// Sort todos with finished state before those without
			if (todoA.finishedAtDate && todoB.finishedAtDate) {
				return todoA.finishedAtDate.toMillis() - todoB.finishedAtDate.toMillis();
			}
			// Sort todos with deadline before those without
			if (todoA.deadlineDate && !todoB.deadlineDate) {
				return -1;
			}

			if (!todoA.deadlineDate && todoB.deadlineDate) {
				return 1;
			}

			// If both have deadlines, sort by deadline
			if (todoA.deadlineDate && todoB.deadlineDate) {
				const deadlineDiff = todoA.deadlineDate!.toMillis() - todoB.deadlineDate!.toMillis();
				if (deadlineDiff !== 0) {
					return deadlineDiff;
				}
			}

			// Fallback: sort by createdAtDate
			return todoA.createdAtDate.toMillis() - todoB.createdAtDate.toMillis();
		});
		saveToLocalStorage(sortedTodos);
		return sortedTodos;
	});

	return { sortedTodos, addNewTodo, removeTodo, toggleFinished, startDraggingTodo, onDropTodo };
});

export type Todo = {
	id: number;
	title: string;
	deadlineDate?: DateTime;
	createdAtDate: DateTime;
	finished: boolean;
	finishedAtDate?: DateTime;
};
