<script setup lang="ts">
import type { Todo } from "@/stores/todos.ts";
import Container from "@/components/general/Container.vue";
import { DateTime } from 'luxon';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'vue-icons-plus/im';

defineProps<{todo: Todo}>()
</script>

<template>
<Container customClasses="border-[1px] border-teal-500 p-4">
		<div class="flex items-center justify-between">
			<p class="text-teal-900 font-bold text-sm">{{todo.title}}</p>
			<input id="checked" class="hidden" type="checkbox" v-model="todo.finished" />
			<label for="checked">
				<ImCheckboxChecked class="text-teal-900" v-if="todo.finished" />
				<ImCheckboxUnchecked class="text-teal-900" v-else />
			</label>
		</div>
		<p class="text-xs text-slate-400">Verval datum: {{ todo.deadlineDate?.toLocaleString(DateTime.DATE_HUGE) }}</p>
	</Container>
</template>

<style scoped></style>
