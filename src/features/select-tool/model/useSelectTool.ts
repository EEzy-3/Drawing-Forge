import { ref } from 'vue'
import { ToolFactory } from '@/entities/tool/model/ToolFactory'
import type { CanvasEngine } from '@/entities/canvas/model/CanvasEngine'
import type { BrushSettings, ToolType } from '@/shared/types/tool'

const factory = new ToolFactory()

export function useSelectTool(engine: CanvasEngine, brushSettings: BrushSettings) {
  const activeTool = ref<ToolType>('brush')

  function selectTool(type: ToolType): void {
    activeTool.value = type
    engine.setTool(
      factory.create(type, {
        ctx: engine.getContext(),
        settings: brushSettings,
        getSnapshot: () => engine.getSnapshot(),
        restoreSnapshot: (data) => engine.restoreSnapshot(data),
      }),
    )
  }

  return { activeTool, selectTool }
}