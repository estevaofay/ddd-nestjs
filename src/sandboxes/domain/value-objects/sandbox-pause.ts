export class SandboxPause {
  private readonly isPaused: boolean;

  constructor(isPaused?: boolean) {
    this.isPaused = !!isPaused;
  }
}
