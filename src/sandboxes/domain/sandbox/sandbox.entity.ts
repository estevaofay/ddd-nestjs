import { SandboxService } from '@src/sandboxes/domain/sandbox-service/sandbox-service.entity';
import { SandboxName } from '@src/sandboxes/domain/sandbox/value-objects';
import { CreateSandboxRequestDto } from '@src/sandboxes/use-cases/create-sandbox';

export class SandboxEntity {
  readonly #services: Map<string, SandboxService> = new Map();

  constructor(
    private readonly name: SandboxName,
    services: SandboxService[],
  ) {
    for (const service of services) {
      this.#services.set(service.name, service);
    }
  }

  static create(dto: CreateSandboxRequestDto) {
    const services = dto.services.map(
      (service) => new SandboxService({ name: service.name }),
    );
    return new SandboxEntity(new SandboxName(dto.name), services);
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
