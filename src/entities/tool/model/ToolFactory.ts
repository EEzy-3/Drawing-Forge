import { BrushTool } from './BrushTool'
import { LineTool } from './LineTool'
import type { ITool } from '@/shared/lib/tool/ITool'
import type { ToolContext } from '@/shared/lib/tool/ToolContext'
import type { ToolType } from '@/shared/types/tool'

export class ToolFactory {
  create(type: ToolType, context: ToolContext): ITool {
    switch (type) {
      case 'brush':
        return new BrushTool(context)
      case 'line':
        return new LineTool(context)
      default: {
        const exhaustive: never = type
        throw new Error(`Unknown tool type: ${exhaustive}`)
      }
    }
  }
}