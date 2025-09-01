<script lang="ts" setup>
import { type Todo, useTodosStore } from '@/stores/todos.ts';
import Container from '@/components/general/Container.vue';
import { DateTime } from 'luxon';
import { ImBin, ImCheckboxChecked, ImCheckboxUnchecked } from 'vue-icons-plus/im';

defineProps<{ todo: Todo }>();
const emit = defineEmits<{e: 'click', todo}>()
const { toggleFinished, removeTodo } = useTodosStore();

</script>

<template>
	<Container customClasses="border-[1px] border-teal-500 p-4">
		<div class="flex items-center justify-between">
			<p class="text-teal-900 font-bold text-sm">{{ todo.title }}</p>
			<input id='"checked" + todo.id' v-model="todo.finished" class="hidden" type="checkbox" />
			<label for="'checked' + todo.id" @click="toggleFinished(todo.id)">
				<ImCheckboxChecked v-if="todo.finished" class="text-teal-900" />
				<ImCheckboxUnchecked v-else class="text-teal-900" />
			</label>
		</div>
		<div class="flex items-center justify-between pt-3">
			<p v-if="todo.deadlineDate" class="text-xs text-slate-400">
				Verval datum: {{ todo.deadlineDate.toLocaleString(DateTime.DATE_HUGE) }}
			</p>
			<p v-else class="text-xs text-slate-400">Geen deadline 🎉</p>

			<button class="flex items-center gap-2 rounded-xl hover:bg-red-50 p-4 text-sm" title="Verwijderen">
				<ImBin class="text-red-300" size="16" />
			</button>
		</div>
	</Container>
</template>

<style scoped></style>
