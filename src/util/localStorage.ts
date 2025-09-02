import type { Todo } from '@/stores/todos.ts';
import { formatDateStringToDateTime, formatDateToString } from '@/util/formatDate.ts';

export const retrieveTodosFromStorage = () => {
	const items = localStorage.getItem('todos');

	if (items) {
		const parsedTodos = JSON.parse(items);

		// localStorage can't handle DateTime types, format ISO strings form localStorage to DateTime dates
		return parsedTodos.map(i => {
			const dtCreatedAt = formatDateStringToDateTime(i.createdAtDate);
			const dtFinishedAt = i.finishedAtDate && formatDateStringToDateTime(i.finishedAtDate);
			const dtDeadlineDate = i.deadlineDate && formatDateStringToDateTime(i.deadlineDate);

			return {
				...i,
				createdAtDate: dtCreatedAt,
				finishedAtDate: dtFinishedAt,
				deadlineDate: dtDeadlineDate,
			};
		});
	} else {
		return [];
	}
};

export const saveToLocalStorage = (todos: Todo[]) => {
	// localStorage can't handle DateTime type, format to ISO before savint to localStorage
	const todosWithFormattedDates = todos.map(t => {
		const newCreatedAt = formatDateToString(t.createdAtDate);
		const newDeadlineDate = t.deadlineDate && formatDateToString(t.deadlineDate);
		const newFinishedAt = t.finishedAtDate && formatDateToString(t.finishedAtDate);

		return {
			...t,
			finishedAtDate: newFinishedAt,
			deadlineDate: newDeadlineDate,
			createdAtDate: newCreatedAt,
		};
	});

	localStorage.setItem('todos', JSON.stringify(todos));
};