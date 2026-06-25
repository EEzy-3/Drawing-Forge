export type ToolType = 'brush' | 'line' | 'rectangle' | 'circle' | 'eraser';

export interface BrushSettings {
  color: string;
  size: number;
}
