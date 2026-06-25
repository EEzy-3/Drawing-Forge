import type { Point } from '@/shared/types/geometry'

export interface ITool {
  readonly cursor: string
  onPointerDown(point: Point): void
  onPointerMove(point: Point): void
  onPointerUp(): void
}