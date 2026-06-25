import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseButton from './BaseButton.vue';

describe('BaseButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(BaseButton, {
      slots: { default: 'Save' },
    });

    expect(wrapper.text()).toBe('Save');
  });

  it('applies ghost variant classes by default', () => {
    const wrapper = mount(BaseButton);

    expect(wrapper.classes()).toContain('text-zinc-300');
    expect(wrapper.classes()).toContain('hover:bg-zinc-800');
  });

  it('applies active toggle classes', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'toggle',
        color: 'violet',
        active: true,
      },
    });

    expect(wrapper.classes()).toContain('bg-violet-600');
    expect(wrapper.classes()).toContain('text-white');
  });

  it('applies inactive toggle classes', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'toggle',
        active: false,
      },
    });

    expect(wrapper.classes()).toContain('text-zinc-400');
    expect(wrapper.classes()).toContain('hover:text-white');
  });

  it('disables the button when disabled prop is true', () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true },
    });

    expect(wrapper.attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain('disabled:opacity-40');
  });

  it('forwards title and aria-label', () => {
    const wrapper = mount(BaseButton, {
      props: {
        title: 'Undo',
        ariaLabel: 'Undo action',
      },
    });

    expect(wrapper.attributes('title')).toBe('Undo');
    expect(wrapper.attributes('aria-label')).toBe('Undo action');
  });
});