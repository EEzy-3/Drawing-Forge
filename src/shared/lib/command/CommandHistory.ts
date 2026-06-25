import type { ICommand } from './ICommand';

export class CommandHistory {
  private undoStack: ICommand[] = [];
  private redoStack: ICommand[] = [];

  constructor(private readonly onChange?: () => void) {}

  get canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  get canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  execute(command: ICommand): void {
    command.execute();
    this.undoStack.push(command);
    this.redoStack = [];
    this.notify();
  }

  undo(): void {
    const command = this.undoStack.pop();

    if (!command) {
      return;
    }

    command.undo();
    this.redoStack.push(command);
    this.notify();
  }

  redo(): void {
    const command = this.redoStack.pop();

    if (!command) {
      return;
    }

    command.execute();
    this.undoStack.push(command);
    this.notify();
  }

  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
    this.notify();
  }

  private notify(): void {
    this.onChange?.();
  }
}