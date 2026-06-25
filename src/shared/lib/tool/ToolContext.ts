import type { BrushSettings } from '@/shared/types'

export interface ToolContext {
  ctx: CanvasRenderingContext2D
  settings: BrushSettings
  getSnapshot(): ImageData
  restoreSnapshot(data: ImageData): void
}