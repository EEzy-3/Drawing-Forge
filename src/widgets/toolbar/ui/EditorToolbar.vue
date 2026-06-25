<template>
  <header class="flex flex-wrap items-center gap-4 border-b border-zinc-800 bg-zinc-900 px-6 py-4">
    <h1 class="text-lg font-semibold tracking-tight text-white">DrawForge</h1>

    <div class="flex items-center gap-1 rounded-lg bg-zinc-800 p-1">
      <button
        v-for="tool in tools"
        :key="tool.type"
        type="button"
        class="rounded-md px-3 py-1.5 text-sm transition-colors"
        :class="activeTool === tool.type ? 'bg-violet-600 text-white' : 'text-zinc-400 hover:text-white'"
        @click="emit('selectTool', tool.type)"
      >
        {{ tool.label }}
      </button>
    </div>

    <div class="flex items-center gap-1">
      <button
        type="button"
        class="rounded-md px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 disabled:opacity-40"
        :disabled="!canUndo"
        @click="emit('undo')"
      >
        Undo
      </button>
      <button
        type="button"
        class="rounded-md px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 disabled:opacity-40"
        :disabled="!canRedo"
        @click="emit('redo')"
      >
        Redo
      </button>
      <button
        type="button"
        class="rounded-md px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800"
        @click="emit('clear')"
      >
        Очистить
      </button>
    </div>

    <BrushSettings v-model:settings="brushSettings" />
  </header>
</template>
<script setup lang="ts">
import { BrushSettings } from '@/features/brush-settings';
import type { BrushSettings as BrushSettingsType, ToolType } from '@/shared/types';

defineProps<{
  activeTool: ToolType;
  canUndo: boolean;
  canRedo: boolean;
}>();

const brushSettings = defineModel<BrushSettingsType>('brushSettings', { required: true });

const emit = defineEmits<{
  selectTool: [type: ToolType];
  undo: [];
  redo: [];
  clear: [];
}>();

const tools: { type: ToolType; label: string }[] = [
  { type: 'brush', label: 'Кисть' },
  { type: 'line', label: 'Линия' },
];
</script>
