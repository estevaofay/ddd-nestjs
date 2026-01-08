import { SandboxEntity } from '@src/sandboxes/domain/sandbox';

export interface SandboxRuntimePort {
  createSandbox(sandbox: SandboxEntity): Promise<void>;
}
