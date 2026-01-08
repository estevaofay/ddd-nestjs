import { SandboxService } from '@src/sandboxes/domain/sandbox-service';
import { SandboxServiceRepositoryPort } from '@src/sandboxes/infrastructure/database/sandbox-service/sandbox-service.repository.port';

export class InMemorySandboxServiceRepository implements SandboxServiceRepositoryPort {
  readonly #services: Map<string, SandboxService> = new Map();

  constructor() {
    this.#services.set(
      'pdf',
      new SandboxService({ name: 'pdf', isValid: false }),
    );
  }

  getValidService(): SandboxService[] {
    const allServices = Array.from(this.#services.values());
    return allServices.filter((service) => service.isValid);
  }
}
