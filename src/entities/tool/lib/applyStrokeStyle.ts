import type { BrushSettings } from '@/shared/types';

export function applyStrokeStyle(ctx: CanvasRenderingContext2D, settings: BrushSettings): void {
  ctx.globalCompositeOperation = 'source-over';
  ctx.strokeStyle = settings.color;
  ctx.lineWidth = settings.size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
}
