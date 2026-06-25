import { BrushTool } from './BrushTool';
import { LineTool } from './LineTool';
import type { ITool, ToolContext } from '@/shared/lib/tool';
import type { ToolType } from '@/shared/types';

export class ToolFactory {
  create(type: ToolType, context: ToolContext): ITool {
    switch (type) {
      case 'brush':
        return new BrushTool(context);
      case 'line':
        return new LineTool(context);
      default: {
        const exhaustive: never = type;
        throw new Error(`Unknown tool type: ${exhaustive}`);
      }
    }
  }
}
