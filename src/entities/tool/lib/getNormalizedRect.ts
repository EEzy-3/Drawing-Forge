import type { Point } from '@/shared/types';

export interface NormalizedRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function getNormalizedRect(start: Point, end: Point): NormalizedRect {
  return {
    x: Math.min(start.x, end.x),
    y: Math.min(start.y, end.y),
    width: Math.abs(end.x - start.x),
    height: Math.abs(end.y - start.y),
  };
}