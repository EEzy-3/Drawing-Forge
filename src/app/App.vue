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

    <div class="flex flex-1 items-center justify-center p-6">
      <canvas ref="canvasRef" class="rounded-lg bg-white shadow-2xl shadow-black/40" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditor } from '@/entities/editor';
import { EditorToolbar } from '@/widgets/toolbar';

const { canvasRef, brushSettings, activeTool, canUndo, canRedo, undo, redo, clear, selectTool } = useEditor();
</script>
