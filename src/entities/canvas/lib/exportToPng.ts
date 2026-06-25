import { EXPORT_FILENAME } from '@/shared/config';

export function exportToPng(canvas: HTMLCanvasElement, filename = EXPORT_FILENAME): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}