import { ref } from 'vue';
import type { CanvasEngine } from '@/entities/canvas';
import { ToolFactory } from '@/entities/tool';
import type { BrushSettings, ToolType } from '@/shared/types';

const factory = new ToolFactory();

export function useSelectTool(engine: CanvasEngine, brushSettings: BrushSettings) {
  const activeTool = ref<ToolType>('brush');

  function selectTool(type: ToolType): void {
    activeTool.value = type;
    engine.setTool(
      factory.create(type, {
        ctx: engine.getContext(),
        settings: brushSettings,
        getSnapshot: () => engine.getSnapshot(),
        restoreSnapshot: (data) => engine.restoreSnapshot(data),
      }),
    );
  }

  return { activeTool, selectTool };
}
