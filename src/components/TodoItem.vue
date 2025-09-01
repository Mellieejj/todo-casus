<script lang="ts" setup>
import { type Todo, useTodosStore } from '@/stores/todos.ts';
import Container from '@/components/general/Container.vue';
import { DateTime } from 'luxon';
import { ImBin, ImCheckboxChecked, ImCheckboxUnchecked } from 'vue-icons-plus/im';
import { cn } from '../util/cn.ts';
import { computed } from 'vue';

const { todo } = defineProps<{ todo: Todo }>();
const { toggleFinished, removeTodo, startDraggingTodo } = useTodosStore();

const todoIsOvertime = computed(
	() => todo.deadlineDate && !todo.finished && todo.deadlineDate < DateTime.now().startOf('day'),
);

const todoIsToday = computed(
	() => todo.deadlineDate && !todo.finished && todo.deadlineDate === DateTime.now().startOf('day'),
);
</script>

<template>
	<Container
		:customClasses="
			cn('border border-teal-500 p-4 shadow', {
				'border-amber-600': todoIsToday,
				'border-red-600': todoIsOvertime,
				'border-2': todoIsOvertime || todoIsToday,
			})
		"
		draggable="true"
		@dragstart="startDraggingTodo($event, todo)">
		<div class="flex items-center justify-between">
			<p :class="cn('text-teal-900 font-bold text-sm', { 'line-through': todo.finished })">{{ todo.title }}</p>
			<input id='"checked" + todo.id' v-model="todo.finished" class="hidden" type="checkbox" />
			<label for="'checked' + todo.id" @click="toggleFinished(todo.id)">
				<ImCheckboxChecked v-if="todo.finished" class="text-teal-900" />
				<ImCheckboxUnchecked v-else class="text-teal-900" />
			</label>
		</div>
		<div class="flex items-center justify-between pt-3">
			<p v-if="todo.deadlineDate" :class="cn('text-xs text-slate-400', { 'line-through': todo.finished })">
				Verval datum: {{ todo.deadlineDate.toLocaleString(DateTime.DATE_HUGE) }}
			</p>
			<p v-else class="text-xs text-slate-400">Geen deadline 🎉</p>

			<button
				class="flex items-center gap-2 rounded-xl hover:bg-red-50 p-4 text-sm"
				title="Verwijderen"
				@click="removeTodo(todo.id)">
				<ImBin class="text-red-300" size="16" />
			</button>
		</div>
	</Container>
</template>

<style scoped>
.shadow {
	box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
}
</style>
