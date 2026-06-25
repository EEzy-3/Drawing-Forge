import { getNormalizedRect, PreviewShapeTool } from '../lib';
import type { ToolContext } from '@/shared/lib/tool';
import type { BrushSettings, Point } from '@/shared/types';

export class RectangleTool extends PreviewShapeTool {
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
    ctx.rect(x, y, width, height);
    ctx.stroke();
  }
}