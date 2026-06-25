<script setup lang="ts">
import { useEditor } from '@/pages/editor/model/useEditor'
import CanvasArea from '@/widgets/canvas-area/ui/CanvasArea.vue'
import EditorToolbar from '@/widgets/toolbar/ui/EditorToolbar.vue'

const {
  canvasRef,
  brushSettings,
  activeTool,
  canUndo,
  canRedo,
  undo,
  redo,
  clear,
  selectTool,
} = useEditor()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <EditorToolbar
      v-model:brush-settings="brushSettings"
      :active-tool="activeTool"
      :can-undo="canUndo"
      :can-redo="canRedo"
      @select-tool="selectTool"
      @undo="undo"
      @redo="redo"
      @clear="clear"
    />
    <CanvasArea>
      <canvas
        ref="canvasRef"
        class="rounded-lg bg-white shadow-2xl shadow-black/40"
      />
    </CanvasArea>
  </div>
</template>