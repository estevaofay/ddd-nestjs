import { SandboxRuntimePort } from './runtime.port';
import { SandboxEntity } from '@src/sandboxes/domain/sandbox';

export class InMemorySandboxRuntime implements SandboxRuntimePort {
  async createSandbox(sandbox: SandboxEntity): Promise<void> {
    await Promise.resolve(sandbox);
    return;
  }
}
