import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import EditorToolbar from './EditorToolbar.vue';
import type { BrushSettings, ToolType } from '@/shared/types';

const defaultBrushSettings: BrushSettings = {
  color: '#1e1e1e',
  size: 8,
};

function mountToolbar(overrides: {
  activeTool?: ToolType;
  canUndo?: boolean;
  canRedo?: boolean;
  brushSettings?: BrushSettings;
} = {}) {
  return mount(EditorToolbar, {
    props: {
      activeTool: overrides.activeTool ?? 'brush',
      canUndo: overrides.canUndo ?? true,
      canRedo: overrides.canRedo ?? false,
      brushSettings: overrides.brushSettings ?? { ...defaultBrushSettings },
    },
  });
}

describe('EditorToolbar', () => {
  it('renders app title and all tool buttons', () => {
    const wrapper = mountToolbar();

    expect(wrapper.text()).toContain('Drawing Forge');
    expect(wrapper.find('[aria-label="Brush"]').exists()).toBe(true);
    expect(wrapper.find('[aria-label="Line"]').exists()).toBe(true);
    expect(wrapper.find('[aria-label="Rectangle"]').exists()).toBe(true);
    expect(wrapper.find('[aria-label="Circle"]').exists()).toBe(true);
    expect(wrapper.find('[aria-label="Eraser"]').exists()).toBe(true);
  });

  it('emits selectTool when a tool button is clicked', async () => {
    const wrapper = mountToolbar({ activeTool: 'brush' });

    await wrapper.find('[aria-label="Line"]').trigger('click');

    expect(wrapper.emitted('selectTool')).toEqual([['line']]);
  });

  it('disables undo and redo buttons based on props', () => {
    const wrapper = mountToolbar({ canUndo: false, canRedo: false });

    expect(wrapper.find('[aria-label="Undo"]').attributes('disabled')).toBeDefined();
    expect(wrapper.find('[aria-label="Redo"]').attributes('disabled')).toBeDefined();
  });

  it('emits undo, redo, clear and exportPng', async () => {
    const wrapper = mountToolbar({ canUndo: true, canRedo: true });

    await wrapper.find('[aria-label="Undo"]').trigger('click');
    await wrapper.find('[aria-label="Redo"]').trigger('click');
    await wrapper.find('[aria-label="Clear"]').trigger('click');
    await wrapper.find('[aria-label="Export PNG"]').trigger('click');

    expect(wrapper.emitted('undo')).toHaveLength(1);
    expect(wrapper.emitted('redo')).toHaveLength(1);
    expect(wrapper.emitted('clear')).toHaveLength(1);
    expect(wrapper.emitted('exportPng')).toHaveLength(1);
  });

  it('marks the active tool button as active', () => {
    const wrapper = mountToolbar({ activeTool: 'eraser' });

    expect(wrapper.find('[aria-label="Eraser"]').classes()).toContain('bg-violet-600');
    expect(wrapper.find('[aria-label="Brush"]').classes()).not.toContain('bg-violet-600');
  });
});