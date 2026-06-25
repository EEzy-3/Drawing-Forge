import { applyEraserStyle } from '../lib';
import type { ITool, ToolContext } from '@/shared/lib/tool';
import type { Point } from '@/shared/types';

export class EraserTool implements ITool {
  readonly cursor = 'cell';

  private drawing = false;

  constructor(private readonly context: ToolContext) {}

  onPointerDown(point: Point): void {
    this.drawing = true;
    applyEraserStyle(this.context.ctx, this.context.settings);
    this.context.ctx.beginPath();
    this.context.ctx.moveTo(point.x, point.y);
  }

  onPointerMove(point: Point): void {
    if (!this.drawing) {
      return;
    }

    this.context.ctx.lineTo(point.x, point.y);
    this.context.ctx.stroke();
  }

  onPointerUp(): void {
    this.drawing = false;
    this.context.ctx.closePath();
    this.context.ctx.globalCompositeOperation = 'source-over';
  }
}