<template>
  <div class="flex items-center gap-4">
    <label class="flex items-center gap-2 text-sm text-zinc-400">
      <span>Color</span>

      <input
        v-model="settings.color"
        type="color"
        class="h-8 w-10 cursor-pointer rounded border border-zinc-700 bg-zinc-800"
      />
    </label>

    <label class="flex items-center gap-2 text-sm text-zinc-400">
      <span>Width</span>

      <input v-model.number="settings.size" type="range" min="1" max="40" class="w-28 accent-violet-500" />

      <span class="text-zinc-300">{{ settings.size }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import type { BrushSettings } from '@/shared/types';

const settings = defineModel<BrushSettings>('settings', { required: true });
</script>