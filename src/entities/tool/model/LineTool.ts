import { applyStrokeStyle } from '../lib'
import type { ITool, ToolContext } from '@/shared/lib/tool'
import type { Point } from '@/shared/types'

export class LineTool implements ITool {
  readonly cursor = 'crosshair'

  private start: Point | null = null
  private end: Point | null = null
  private baseSnapshot: ImageData | null = null

  constructor(private readonly context: ToolContext) {}

  onPointerDown(point: Point): void {
    this.start = point
    this.end = point
    this.baseSnapshot = this.context.getSnapshot()
  }

  onPointerMove(point: Point): void {
    if (!this.start || !this.baseSnapshot) {
      return
    }

    this.end = point
    this.preview()
  }

  onPointerUp(): void {
    if (!this.start || !this.end || !this.baseSnapshot) {
      return
    }

    this.preview()
    this.reset()
  }

  private preview(): void {
    if (!this.start || !this.end || !this.baseSnapshot) {
      return
    }

    this.context.restoreSnapshot(this.baseSnapshot)
    const { ctx, settings } = this.context

    applyStrokeStyle(ctx, settings)
    ctx.beginPath()
    ctx.moveTo(this.start.x, this.start.y)
    ctx.lineTo(this.end.x, this.end.y)
    ctx.stroke()
  }

  private reset(): void {
    this.start = null
    this.end = null
    this.baseSnapshot = null
  }
}