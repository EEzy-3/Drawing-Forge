import type { Point } from '@/shared/types';

export interface ITool {
  readonly cursor: string;
  onPointerDown(point: Point): void;
  onPointerMove(point: Point): void;
  onPointerUp(): void;
}
