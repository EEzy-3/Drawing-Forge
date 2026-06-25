# DrawForge Vue

Профессиональный canvas-редактор на Vue 3 + TypeScript. Инструменты **кисть** и **линия**, история действий (Undo/Redo) и современный UI на Tailwind.

## Стек

- Vue 3 (Composition API)
- TypeScript
- Canvas API
- Tailwind CSS v4
- Vite
- FSD (Feature-Sliced Design)

## Запуск

```sh
npm install
npm run dev
```

```sh
npm run build    # type-check + production build
npm run lint
```

## Структура (FSD)

```
src/
├── app/           # точка входа, глобальные стили
├── widgets/       # составные UI-блоки (toolbar, canvas-area)
├── features/      # пользовательские сценарии (выбор инструмента, undo/redo, настройки кисти)
├── entities/      # бизнес-сущности (canvas, tool)
└── shared/        # переиспользуемый код (паттерны, типы, конфиг)
```

## Архитектура и применённые принципы

### Паттерны проектирования

| Паттерн | Файлы | Назначение |
|---------|-------|------------|
| **Strategy** | `shared/lib/tool/ITool.ts`, `entities/tool/model/BrushTool.ts`, `entities/tool/model/LineTool.ts` | Каждый инструмент — отдельная стратегия с единым интерфейсом. `CanvasEngine` делегирует события активному инструменту, не зная деталей реализации. |
| **Command** | `shared/lib/command/ICommand.ts`, `shared/lib/command/CommandHistory.ts`, `entities/canvas/model/SnapshotCommand.ts` | Каждый штрих — команда со снимками холста до/после. `CommandHistory` управляет стеками Undo/Redo. |
| **Factory** | `entities/tool/model/ToolFactory.ts` | Создание инструментов по типу через `ToolContext`. Новый инструмент = новый класс + case в factory. |
| **Facade** | `entities/canvas/model/CanvasEngine.ts` | Единая точка входа для работы с canvas: DPR, снимки, события, делегирование инструменту. |

### SOLID

| Принцип | Применение |
|---------|------------|
| **SRP** | `BrushTool` / `LineTool` — только своя логика рисования. `CommandHistory` — только стек команд. `ToolFactory` — только создание инструментов. |
| **OCP** | Новый инструмент добавляется через `ITool` + `ToolFactory`, без изменения `CanvasEngine`. |
| **LSP** | Любой инструмент, реализующий `ITool`, взаимозаменяем в движке. |
| **ISP** | `ITool` и `ICommand` — минимальные интерфейсы без лишних методов. |
| **DIP** | `CanvasEngine` зависит от абстракции `ITool`, а не от конкретной `BrushTool`. |

### Поток рисования

```
pointerdown → CanvasEngine сохраняет снимок «до» → ITool.onPointerDown
pointermove → ITool.onPointerMove (LineTool: превью через restoreSnapshot)
pointerup   → ITool.onPointerUp → SnapshotCommand в CommandHistory
```

### FSD-правила импортов

- `shared` → только `shared`
- `entities` → `shared`
- `features` → `entities`, `shared`
- `widgets` → `features`, `entities`, `shared`
- `pages` → `widgets`, `features`, `entities`, `shared`
- `app` → `pages`, `shared`

## Roadmap

- [x] Линия
- [ ] Прямоугольник / круг
- [ ] Текст
- [ ] Экспорт PNG
- [ ] Unit-тесты паттернов