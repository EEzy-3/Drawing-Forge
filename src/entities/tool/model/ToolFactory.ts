import { BrushTool } from './BrushTool';
import { CircleTool } from './CircleTool';
import { EraserTool } from './EraserTool';
import { LineTool } from './LineTool';
import { RectangleTool } from './RectangleTool';
import type { ITool, ToolContext } from '@/shared/lib/tool';
import type { ToolType } from '@/shared/types';

export class ToolFactory {
  create(type: ToolType, context: ToolContext): ITool {
    switch (type) {
      case 'brush':
        return new BrushTool(context);
      case 'line':
        return new LineTool(context);
      case 'rectangle':
        return new RectangleTool(context);
      case 'circle':
        return new CircleTool(context);
      case 'eraser':
        return new EraserTool(context);
      default: {
        const exhaustive: never = type;
        throw new Error(`Unknown tool type: ${exhaustive}`);
      }
    }
  }
}