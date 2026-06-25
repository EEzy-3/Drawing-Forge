import { getNormalizedRect, PreviewShapeTool } from '../lib';
import type { ToolContext } from '@/shared/lib/tool';
import type { BrushSettings, Point } from '@/shared/types';

export class CircleTool extends PreviewShapeTool {
  constructor(context: ToolContext) {
    super(context);
  }

  protected drawShape(
    ctx: CanvasRenderingContext2D,
    _settings: BrushSettings,
    start: Point,
    end: Point,
  ): void {
    const { x, y, width, height } = getNormalizedRect(start, end);

    ctx.beginPath();
    ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
}