<template>
  <button type="button" :class="classes" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonColor, ButtonSize, ButtonVariant } from '../model/types';

const props = withDefaults(
  defineProps<{
    size?: ButtonSize;
    color?: ButtonColor;
    variant?: ButtonVariant;
    active?: boolean;
    disabled?: boolean;
  }>(),
  {
    size: 'sm',
    color: 'neutral',
    variant: 'ghost',
    active: false,
    disabled: false,
  },
);

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
};

const SOLID_COLOR_CLASSES: Record<ButtonColor, string> = {
  violet: 'bg-violet-600 text-white',
  neutral: 'bg-zinc-700 text-white',
};

const classes = computed(() => {
  const result = ['rounded-md', 'transition-colors', 'cursor-pointer', SIZE_CLASSES[props.size]];

  if (props.variant === 'toggle') {
    if (props.active) {
      result.push(SOLID_COLOR_CLASSES[props.color]);
    } else {
      result.push('text-zinc-400 hover:text-white');
    }
    return result;
  }

  if (props.variant === 'ghost') {
    result.push('text-zinc-300 hover:bg-zinc-800 disabled:opacity-40');
    return result;
  }

  result.push(SOLID_COLOR_CLASSES[props.color]);
  return result;
});
</script>