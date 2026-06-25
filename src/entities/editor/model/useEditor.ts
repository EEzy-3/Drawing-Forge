import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { CanvasEngine, SnapshotCommand } from '@/entities/canvas'
import { useSelectTool } from '@/features/select-tool'
import { useUndoRedo } from '@/features/undo-redo'
import { CANVAS_HEIGHT, CANVAS_WIDTH, DEFAULT_BRUSH } from '@/shared/config'
import { CommandHistory } from '@/shared/lib/command'
import type { BrushSettings, ToolType } from '@/shared/types'

export function useEditor() {
  const canvasRef = ref<HTMLCanvasElement | null>(null)
  const brushSettings = reactive<BrushSettings>({
    color: DEFAULT_BRUSH.color,
    size: DEFAULT_BRUSH.size,
  })

  const history = new CommandHistory()
  const { canUndo, canRedo, undo, redo } = useUndoRedo(history)

  let engine: CanvasEngine | null = null
  let unbindPointer: (() => void) | null = null
  let drawing = false
  let selectToolFn: ((type: ToolType) => void) | null = null

  const activeTool = ref<ToolType>('brush')

  function pushSnapshot(before: ImageData, after: ImageData): void {
    if (!engine) {
      return;
    }

    history.execute(
      new SnapshotCommand((data) => engine!.restoreSnapshot(data), before, after),
    )
  }

  function clear(): void {
    if (!engine) {
      return
    }

    const before = engine.getSnapshot()
    engine.clear()
    pushSnapshot(before, engine.getSnapshot())
  }

  onMounted(() => {
    const canvas = canvasRef.value

    if (!canvas) {
      return
    }

    engine = CanvasEngine.fromElement(canvas, CANVAS_WIDTH, CANVAS_HEIGHT)
    const { selectTool } = useSelectTool(engine, brushSettings)
    selectToolFn = selectTool
    selectTool('brush')

    const finishStroke = () => {
      if (!drawing || !engine) {
        return
      }

      drawing = false
      const before = engine.consumeSnapshotBefore()
      
      if (!before) {
        return
      }

      pushSnapshot(before, engine.getSnapshot())
    }

    const onDown = () => {
      drawing = true
    }

    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointerup', finishStroke)
    canvas.addEventListener('pointerleave', finishStroke)
    unbindPointer = engine.bindPointerEvents(canvas)

    onUnmounted(() => {
      unbindPointer?.()
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointerup', finishStroke)
      canvas.removeEventListener('pointerleave', finishStroke)
    })
  })

  function selectTool(type: ToolType): void {
    activeTool.value = type
    selectToolFn?.(type)
  }

  return {
    canvasRef,
    brushSettings,
    activeTool,
    canUndo,
    canRedo,
    undo,
    redo,
    clear,
    selectTool,
  }
}