export class SandboxLock {
  private readonly isLocked: boolean;

  constructor(isLocked?: boolean) {
    if (!isLocked) {
      this.isLocked = false;
      return;
    }
    this.isLocked = isLocked;
  }
}
