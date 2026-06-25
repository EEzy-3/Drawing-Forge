import { applyStrokeStyle } from './applyStrokeStyle';
import type { ITool, ToolContext } from '@/shared/lib/tool';
import type { BrushSettings, Point } from '@/shared/types';

export abstract class PreviewShapeTool implements ITool {
  readonly cursor = 'crosshair';

  private start: Point | null = null;
  private end: Point | null = null;
  private baseSnapshot: ImageData | null = null;

  constructor(protected readonly context: ToolContext) {}

  onPointerDown(point: Point): void {
    this.start = point;
    this.end = point;
    this.baseSnapshot = this.context.getSnapshot();
  }

  onPointerMove(point: Point): void {
    if (!this.start || !this.baseSnapshot) {
      return;
    }

    this.end = point;
    this.preview();
  }

  onPointerUp(): void {
    if (!this.start || !this.end || !this.baseSnapshot) {
      return;
    }

    this.preview();
    this.reset();
  }

  protected abstract drawShape(
    ctx: CanvasRenderingContext2D,
    settings: BrushSettings,
    start: Point,
    end: Point,
  ): void;

  private preview(): void {
    if (!this.start || !this.end || !this.baseSnapshot) {
      return;
    }

    this.context.restoreSnapshot(this.baseSnapshot);
    const { ctx, settings } = this.context;

    applyStrokeStyle(ctx, settings);
    this.drawShape(ctx, settings, this.start, this.end);
  }

  private reset(): void {
    this.start = null;
    this.end = null;
    this.baseSnapshot = null;
  }
}