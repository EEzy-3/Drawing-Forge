import type { ITool } from '@/shared/lib/tool';
import type { Point } from '@/shared/types';

export class CanvasEngine {
  private tool: ITool | null = null;
  private snapshotBefore: ImageData | null = null;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly ctx: CanvasRenderingContext2D,
  ) {
    this.fillBackground();
  }

  static fromElement(canvas: HTMLCanvasElement, width: number, height: number): CanvasEngine {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Canvas 2D context is not available');
    }

    ctx.scale(dpr, dpr);
    return new CanvasEngine(canvas, ctx);
  }

  getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }

  setTool(tool: ITool): void {
    this.tool = tool;
    this.canvas.style.cursor = tool.cursor;
  }

  getSnapshot(): ImageData {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    const snapshot = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
    return snapshot;
  }

  restoreSnapshot(data: ImageData): void {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.putImageData(data, 0, 0);
    this.ctx.restore();
  }

  clear(): void {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
    this.fillBackground();
  }

  bindPointerEvents(element: HTMLElement): () => void {
    const toPoint = (event: PointerEvent): Point => {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const onDown = (event: PointerEvent) => {
      element.setPointerCapture(event.pointerId);
      this.snapshotBefore = this.getSnapshot();
      this.tool?.onPointerDown(toPoint(event));
    };

    const onMove = (event: PointerEvent) => {
      this.tool?.onPointerMove(toPoint(event));
    };

    const onUp = (event: PointerEvent) => {
      this.tool?.onPointerUp();
      element.releasePointerCapture(event.pointerId);
    };

    element.addEventListener('pointerdown', onDown);
    element.addEventListener('pointermove', onMove);
    element.addEventListener('pointerup', onUp);
    element.addEventListener('pointerleave', onUp);

    return () => {
      element.removeEventListener('pointerdown', onDown);
      element.removeEventListener('pointermove', onMove);
      element.removeEventListener('pointerup', onUp);
      element.removeEventListener('pointerleave', onUp);
    };
  }

  consumeSnapshotBefore(): ImageData | null {
    const snapshot = this.snapshotBefore;
    this.snapshotBefore = null;
    return snapshot;
  }

  private fillBackground(): void {
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
  }
}
