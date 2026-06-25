import type { BrushSettings } from '@/shared/types';

export function applyEraserStyle(ctx: CanvasRenderingContext2D, settings: BrushSettings): void {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.strokeStyle = 'rgba(0,0,0,1)';
  ctx.lineWidth = settings.size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
}