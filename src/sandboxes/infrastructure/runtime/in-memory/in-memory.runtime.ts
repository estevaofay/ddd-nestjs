import { SandboxEntity } from '@src/sandboxes/domain/sandbox';
import { SandboxRuntimePort } from '@src/sandboxes/infrastructure/runtime';

export class InMemorySandboxRuntime implements SandboxRuntimePort {
  async createSandbox(sandbox: SandboxEntity): Promise<void> {
    await Promise.resolve(sandbox);
    return;
  }
}
