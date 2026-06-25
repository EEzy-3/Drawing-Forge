import { computed, type Ref } from 'vue';
import { CommandHistory } from '@/shared/lib/command';

export function useUndoRedo(history: CommandHistory, revision: Ref<number>) {
  const canUndo = computed(() => revision.value >= 0 && history.canUndo);

  const canRedo = computed(() => revision.value >= 0 && history.canRedo);

  function undo(): void {
    history.undo();
  }

  function redo(): void {
    history.redo();
  }

  function clearHistory(): void {
    history.clear();
  }

  return { canUndo, canRedo, undo, redo, clearHistory };
}