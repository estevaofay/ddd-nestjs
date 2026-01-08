import { SandboxService } from '@src/sandboxes/domain/sandbox-service';

export interface SandboxServiceRepositoryPort {
  getValidService(): SandboxService[];
}
