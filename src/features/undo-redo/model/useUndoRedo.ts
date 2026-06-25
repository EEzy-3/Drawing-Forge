import { computed } from 'vue'
import { CommandHistory } from '@/shared/lib/command'

export function useUndoRedo(history: CommandHistory) {
  const canUndo = computed(() => history.canUndo)
  const canRedo = computed(() => history.canRedo)

  function undo(): void {
    history.undo()
  }

  function redo(): void {
    history.redo()
  }

  function clearHistory(): void {
    history.clear()
  }

  return { canUndo, canRedo, undo, redo, clearHistory }
}