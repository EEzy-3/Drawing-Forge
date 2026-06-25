### Паттерны проектирования

| Паттерн      | Файлы                                                                                                                | Назначение                                                                                                                                         |
| ------------ | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Strategy** | `shared/lib/tool/ITool.ts`, `entities/tool/model/BrushTool.ts`, `entities/tool/model/LineTool.ts`                    | Каждый инструмент — отдельная стратегия с единым интерфейсом. `CanvasEngine` делегирует события активному инструменту, не зная деталей реализации. |
| **Command**  | `shared/lib/command/ICommand.ts`, `shared/lib/command/CommandHistory.ts`, `entities/canvas/model/SnapshotCommand.ts` | Каждый штрих — команда со снимками холста до/после. `CommandHistory` управляет стеками Undo/Redo.                                                  |
| **Factory**  | `entities/tool/model/ToolFactory.ts`                                                                                 | Создание инструментов по типу через `ToolContext`. Новый инструмент = новый класс + case в factory.                                                |
| **Facade**   | `entities/canvas/model/CanvasEngine.ts`                                                                              | Единая точка входа для работы с canvas: DPR, снимки, события, делегирование инструменту.                                                           |

### SOLID

| Принцип | Применение                                                                                                                                    |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **SRP** | `BrushTool` / `LineTool` — только своя логика рисования. `CommandHistory` — только стек команд. `ToolFactory` — только создание инструментов. |
| **OCP** | Новый инструмент добавляется через `ITool` + `ToolFactory`, без изменения `CanvasEngine`.                                                     |
| **LSP** | Любой инструмент, реализующий `ITool`, взаимозаменяем в движке.                                                                               |
| **ISP** | `ITool` и `ICommand` — минимальные интерфейсы без лишних методов.                                                                             |
| **DIP** | `CanvasEngine` зависит от абстракции `ITool`, а не от конкретной `BrushTool`.                                                                 |

### Поток рисования

```
pointerdown → CanvasEngine сохраняет снимок «до» → ITool.onPointerDown
pointermove → ITool.onPointerMove (LineTool: превью через restoreSnapshot)
pointerup   → ITool.onPointerUp → SnapshotCommand в CommandHistory
```
