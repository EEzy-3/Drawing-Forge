<template>
  <header class="flex flex-wrap items-center gap-8 border-b border-zinc-800 bg-zinc-900 px-4 py-4">
    <div class="flex items-center gap-2">
      <img src="/favicon.ico" alt="logo" class="w-12" />

      <h1 class="text-lg font-semibold">Drawing Forge</h1>
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex gap-4">
        <div class="flex items-center gap-1 rounded-lg bg-zinc-800">
          <Button
            v-for="tool in tools"
            :key="tool.type"
            variant="toggle"
            color="violet"
            :active="activeTool === tool.type"
            @click="emit('selectTool', tool.type)"
          >
            {{ tool.label }}
          </Button>
        </div>
    
        <BrushSettings v-model:settings="brushSettings" />
      </div>

      <div class="flex items-center gap-1">
        <Button variant="ghost" :disabled="!canUndo" @click="emit('undo')">Undo</Button>
  
        <Button variant="ghost" :disabled="!canRedo" @click="emit('redo')">Redo</Button>
  
        <Button variant="ghost" @click="emit('clear')">Clear</Button>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { BrushSettings } from '@/features/brush-settings';
import { Button } from '@/shared/ui/button';
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
  { type: 'brush', label: 'Brush' },
  { type: 'line', label: 'Line' },
];
</script>