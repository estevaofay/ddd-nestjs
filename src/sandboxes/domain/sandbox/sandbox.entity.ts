import { SandboxService } from '@src/sandboxes/domain/sandbox-service/sandbox-service.entity';
import { SandboxName } from '@src/sandboxes/domain/sandbox/value-objects';

export class SandboxEntity {
  readonly #services: Map<string, SandboxService> = new Map();

  constructor(private readonly name: SandboxName) {}

  static create(name?: string) {
    return new SandboxEntity(new SandboxName(name));
  }

  getName(): string {
    return this.name.unpack();
  }

  get services(): SandboxService[] {
    return Array.from(this.#services.values());
  }

  deployService(service: SandboxService): void {
    this.#services.set(service.name, service);
  }

  redeployService(service: SandboxService) {
    const serviceInstance = this.#services.get(service?.name);
    if (!serviceInstance) {
      this.#services.set(service.name, service);
    }
    // issue event Deploy service?
  }
}
