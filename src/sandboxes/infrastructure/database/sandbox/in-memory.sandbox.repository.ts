import { Injectable } from '@nestjs/common';
import { SandboxRepositoryPort } from './sandbox.repository.port';
import { SandboxEntity } from '@src/sandboxes/domain/sandbox';
import { SandboxAlreadyExistsError } from '@src/sandboxes/domain/sandbox/errors';

@Injectable()
export class InMemorySandboxRepository implements SandboxRepositoryPort {
  private readonly sandboxMap: Map<string, SandboxEntity> = new Map();

  createSandbox(sandbox: SandboxEntity): SandboxEntity {
    const sandboxInstance = this.sandboxMap.get(sandbox.getName());
    if (undefined !== sandboxInstance) {
      throw new SandboxAlreadyExistsError();
    }
    this.sandboxMap.set(sandbox.getName(), sandbox);
    return sandbox;
  }

  findAllSandboxes(): SandboxEntity[] {
    return Array.from(this.sandboxMap.values());
  }
}
