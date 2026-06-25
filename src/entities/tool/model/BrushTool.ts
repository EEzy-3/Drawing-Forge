import { applyStrokeStyle } from '@/entities/tool/lib/applyStrokeStyle'
import type { ITool } from '@/shared/lib/tool/ITool'
import type { ToolContext } from '@/shared/lib/tool/ToolContext'
import type { Point } from '@/shared/types/geometry'

export class BrushTool implements ITool {
  readonly cursor = 'crosshair'

  private drawing = false

  constructor(private readonly context: ToolContext) {}

  onPointerDown(point: Point): void {
    this.drawing = true
    applyStrokeStyle(this.context.ctx, this.context.settings)
    this.context.ctx.beginPath()
    this.context.ctx.moveTo(point.x, point.y)
  }

  onPointerMove(point: Point): void {
    if (!this.drawing) return
    this.context.ctx.lineTo(point.x, point.y)
    this.context.ctx.stroke()
  }

  onPointerUp(): void {
    this.drawing = false
    this.context.ctx.closePath()
  }
}