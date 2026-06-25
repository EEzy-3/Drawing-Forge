<template>
  <div class="flex items-center gap-4 bg-gray-500 px-3 py-1">
    <input v-model="settings.color" type="color" class="h-8 w-8 cursor-pointer" />

    <label class="flex items-center gap-2 text-sm text-black font-bold">
      <span>W</span>

      <input v-model.number="settings.size" type="range" min="1" max="40" class="w-28" />

      <span class="w-4">{{ settings.size }}</span>
    </label>
  </div>
</template>
<script setup lang="ts">
import type { BrushSettings } from '@/shared/types';

const settings = defineModel<BrushSettings>('settings', { required: true });
</script>
