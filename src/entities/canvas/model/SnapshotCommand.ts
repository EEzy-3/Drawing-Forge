import type { ICommand } from '@/shared/lib/command'

export class SnapshotCommand implements ICommand {
  constructor(
    private readonly restore: (data: ImageData) => void,
    private readonly before: ImageData,
    private readonly after: ImageData,
  ) {}

  execute(): void {
    this.restore(this.after)
  }

  undo(): void {
    this.restore(this.before)
  }
}