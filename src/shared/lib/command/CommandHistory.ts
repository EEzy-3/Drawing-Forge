import type { ICommand } from './ICommand';

export class CommandHistory {
  private undoStack: ICommand[] = [];
  private redoStack: ICommand[] = [];

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
  }

  undo(): void {
    const command = this.undoStack.pop();

    if (!command) {
      return;
    }

    command.undo();
    this.redoStack.push(command);
  }

  redo(): void {
    const command = this.redoStack.pop();

    if (!command) {
      return;
    }

    command.execute();
    this.undoStack.push(command);
  }

  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
  }
}
