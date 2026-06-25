import { type Ref } from 'vue';
import { exportToPng } from '@/entities/canvas';

export function useExportPng(canvasRef: Ref<HTMLCanvasElement | null>) {
  function exportPng(): void {
    if (!canvasRef.value) {
      return;
    }

    exportToPng(canvasRef.value);
  }

  return { exportPng };
}