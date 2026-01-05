import { SandboxEntity } from '@src/sandboxes/domain/sandbox.entity';

export interface SandboxRuntimePort {
  createSandbox(sandbox: SandboxEntity): Promise<void>;
}
