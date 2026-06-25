# Drawing Forge

Canvas-редактор на Vue 3 + TypeScript. Пять инструментов рисования, история действий (Undo/Redo) и современный UI.

## Стек

- Vue 3 (Composition API)
- TypeScript
- Canvas API
- Tailwind CSS v4
- Vite
- Vitest + Vue Test Utils
- FSD (Feature-Sliced Design)

## Запуск

```sh
npm install
npm run dev
```

```sh
npm run build    # type-check + production build
npm run test     # unit-тесты (watch)
npm run test:run # unit-тесты (один прогон)
npm run lint
npm run preview  # предпросмотр production-сборки
```

## Инструменты

| Инструмент    | Класс           | Тип рисования                          |
| ------------- | --------------- | -------------------------------------- |
| Кисть         | `BrushTool`     | Свободный штрих                        |
| Линия         | `LineTool`      | Drag + live preview                    |
| Прямоугольник | `RectangleTool` | Drag + live preview                    |
| Круг / эллипс | `CircleTool`    | Drag + live preview                    |
| Ластик        | `EraserTool`    | Свободное стирание (`destination-out`) |

Фигуры с превью (`LineTool`, `RectangleTool`, `CircleTool`) наследуют базовый класс `PreviewShapeTool` — общая логика snapshot → restore → draw, у каждого инструмента только метод `drawShape()`.

### Разделение shared и entities

| Слой                               | Что лежит                    | Зачем                                                                 |
| ---------------------------------- | ---------------------------- | --------------------------------------------------------------------- |
| `entities/canvas`, `entities/tool` | Конкретная бизнес-логика     | Реализации сущностей редактора                                        |
| `shared/lib/tool`                  | `ITool`, `ToolContext`       | Контракт между `canvas` и `tool` (entities не импортируют друг друга) |
| `shared/lib/command`               | `ICommand`, `CommandHistory` | Generic-паттерн Command, не привязан к домену                         |

## Архитектура и применённые принципы

### Паттерны проектирования

| Паттерн             | Файлы                                                                                                                | Назначение                                                                                                                                         |
| ------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Strategy**        | `shared/lib/tool/ITool.ts`, `entities/tool/model/*Tool.ts`                                                           | Каждый инструмент — отдельная стратегия с единым интерфейсом. `CanvasEngine` делегирует события активному инструменту, не зная деталей реализации. |
| **Template Method** | `entities/tool/lib/PreviewShapeTool.ts`, `LineTool`, `RectangleTool`, `CircleTool`                                   | Общий алгоритм drag-preview вынесен в базовый класс; подклассы переопределяют только `drawShape()`.                                                |
| **Command**         | `shared/lib/command/ICommand.ts`, `shared/lib/command/CommandHistory.ts`, `entities/canvas/model/SnapshotCommand.ts` | Каждое действие — команда со снимками холста до/после. `CommandHistory` управляет стеками Undo/Redo.                                               |
| **Factory**         | `entities/tool/model/ToolFactory.ts`                                                                                 | Создание инструментов по типу через `ToolContext`. Новый инструмент = новый класс + case в factory.                                                |
| **Facade**          | `entities/canvas/model/CanvasEngine.ts`                                                                              | Единая точка входа для работы с canvas: DPR, снимки, события, делегирование инструменту.                                                           |

### SOLID

| Принцип | Применение                                                                                                                                      |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **SRP** | Каждый `*Tool` — только своя логика рисования. `CommandHistory` — только стек команд. `ToolFactory` — только создание инструментов.             |
| **OCP** | Новый инструмент добавляется через `ITool` + `ToolFactory`, без изменения `CanvasEngine`. Фигуры с превью расширяются через `PreviewShapeTool`. |
| **LSP** | Любой инструмент, реализующий `ITool`, взаимозаменяем в движке.                                                                                 |
| **ISP** | `ITool` и `ICommand` — минимальные интерфейсы без лишних методов.                                                                               |
| **DIP** | `CanvasEngine` зависит от абстракции `ITool`, а не от конкретной `BrushTool`.                                                                   |

### Поток рисования

```
pointerdown → CanvasEngine сохраняет снимок «до» → ITool.onPointerDown
pointermove → ITool.onPointerMove (фигуры: превью через restoreSnapshot)
pointerup   → ITool.onPointerUp → SnapshotCommand в CommandHistory
```

## Как добавить новый инструмент

1. Создать класс в `entities/tool/model/` — `implements ITool` или `extends PreviewShapeTool` (если нужен drag-preview).
2. Добавить `case` в `ToolFactory`.
3. Расширить union `ToolType` в `shared/types/tool.ts`.
4. Добавить иконку в `shared/ui/icons/` и запись в `widgets/toolbar/ui/EditorToolbar.vue`.
