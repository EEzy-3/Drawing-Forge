<template>
  <header class="flex gap-4 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
    <div class="flex items-start">
      <div class="flex items-center gap-2">
        <img src="/favicon.ico" alt="" class="w-10 h-10" />

        <h1 class="font-semibold">Drawing Forge</h1>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex items-center 1">
        <Button size="icon" variant="ghost" title="Undo" aria-label="Undo" :disabled="!canUndo" @click="emit('undo')">
          <IconUndo />
        </Button>

        <Button size="icon" variant="ghost" title="Redo" aria-label="Redo" :disabled="!canRedo" @click="emit('redo')">
          <IconRedo />
        </Button>

        <Button size="icon" variant="ghost" title="Clear" aria-label="Clear" @click="emit('clear')">
          <IconTrash />
        </Button>

        <Button size="icon" variant="ghost" title="Export PNG" aria-label="Export PNG" @click="emit('exportPng')">
          <IconDownload />
        </Button>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <div class="flex items-center rounded-lg bg-zinc-800">
          <Button
            v-for="tool in tools"
            :key="tool.type"
            size="icon"
            variant="toggle"
            color="violet"
            :active="activeTool === tool.type"
            :title="tool.label"
            :aria-label="tool.label"
            @click="emit('selectTool', tool.type)"
          >
            <component :is="tool.icon" />
          </Button>
        </div>

        <BrushSettings v-model:settings="brushSettings" />
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import type { Component } from 'vue';
import { BrushSettings } from '@/features/brush-settings';
import { Button } from '@/shared/ui/button';
import {
  IconBrush,
  IconCircle,
  IconDownload,
  IconEraser,
  IconLine,
  IconRectangle,
  IconRedo,
  IconTrash,
  IconUndo,
} from '@/shared/ui/icons';
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
  exportPng: [];
}>();

const tools: { type: ToolType; label: string; icon: Component }[] = [
  { type: 'brush', label: 'Brush', icon: IconBrush },
  { type: 'line', label: 'Line', icon: IconLine },
  { type: 'rectangle', label: 'Rectangle', icon: IconRectangle },
  { type: 'circle', label: 'Circle', icon: IconCircle },
  { type: 'eraser', label: 'Eraser', icon: IconEraser },
];
</script>
