import { Injectable } from '@nestjs/common';
import { SandboxRepositoryPort } from './sandbox.repository.port';
import { SandboxEntity } from '../domain/sandbox.entity';

@Injectable()
export class InMemorySandboxRepository implements SandboxRepositoryPort {

  private readonly sandboxMap: Map<string, SandboxEntity> = new Map();

  createSandbox(sandbox: SandboxEntity): SandboxEntity {
    this.sandboxMap.set(sandbox.getName(), sandbox);
    return sandbox;
  }

  findAllSandboxes(): SandboxEntity[] {
    return Array.from(this.sandboxMap.values());
  }
}
