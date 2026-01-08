import { SandboxEntity } from '@src/sandboxes/domain/sandbox';
import { SandboxService } from '@src/sandboxes/domain/sandbox-service';

export class SandboxCreatedEvent {
  readonly #services: SandboxService[];
  readonly sandbox: SandboxEntity;

  constructor(sandbox: SandboxEntity) {
    this.#services = sandbox.services;
    this.sandbox = sandbox;
  }

  get services(): SandboxService[] {
    return this.#services;
  }
}
