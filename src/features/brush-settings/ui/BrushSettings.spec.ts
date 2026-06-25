import { mount } from '@vue/test-utils';
import { defineComponent, ref } from 'vue';
import { describe, expect, it } from 'vitest';
import BrushSettings from './BrushSettings.vue';
import type { BrushSettings as BrushSettingsType } from '@/shared/types';

const defaultSettings: BrushSettingsType = {
  color: '#1e1e1e',
  size: 8,
};

function mountBrushSettings(initial: BrushSettingsType = defaultSettings) {
  const Parent = defineComponent({
    components: { BrushSettings },
    setup() {
      const settings = ref<BrushSettingsType>({ ...initial });
      return { settings };
    },
    template: '<BrushSettings v-model:settings="settings" />',
  });

  return mount(Parent);
}

describe('BrushSettings', () => {
  it('renders color picker and size slider', () => {
    const wrapper = mountBrushSettings();

    expect(wrapper.find('input[type="color"]').exists()).toBe(true);
    expect(wrapper.find('input[type="range"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('8');
  });

  it('updates color through v-model', async () => {
    const wrapper = mountBrushSettings();

    await wrapper.find('input[type="color"]').setValue('#ff0000');

    expect(wrapper.vm.settings.color).toBe('#ff0000');
    expect(wrapper.vm.settings.size).toBe(8);
  });

  it('updates brush size through v-model', async () => {
    const wrapper = mountBrushSettings();

    await wrapper.find('input[type="range"]').setValue(16);

    expect(wrapper.vm.settings.size).toBe(16);
    expect(wrapper.vm.settings.color).toBe('#1e1e1e');
  });
});