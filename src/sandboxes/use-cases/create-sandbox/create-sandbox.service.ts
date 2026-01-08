import { Inject, Logger } from '@nestjs/common';
import { type SandboxRuntimePort } from '@src/sandboxes/infrastructure/runtime';
import { type SandboxRepositoryPort } from '@src/sandboxes/infrastructure/database/sandbox';
import { type SandboxServiceRepositoryPort } from '@src/sandboxes/infrastructure/database/sandbox-service';
import { SandboxEntity } from '@src/sandboxes/domain/sandbox';
import {
  SandboxService,
  SandboxServiceIsInvalidError,
} from '@src/sandboxes/domain/sandbox-service';
import { CreateSandboxRequestDto } from '@src/sandboxes/use-cases/create-sandbox/create-sandbox.request.dto';
import {
  SANDBOX_SERVICE_REPOSITORY
} from '@src/sandboxes/infrastructure/database/sandbox-service/sandbox-service.di-tokens';
import { SANDBOX_REPOSITORY } from '@src/sandboxes/infrastructure/database/sandbox/sandbox.di-tokens';
import { SANDBOX_RUNTIME } from '@src/sandboxes/infrastructure/runtime/runtime.di-tokens';

export class CreateSandboxService {
  private readonly logger = new Logger(CreateSandboxService.name);

  constructor(
    @Inject(SANDBOX_RUNTIME) private readonly runtime: SandboxRuntimePort,
    @Inject(SANDBOX_REPOSITORY)
    private readonly repository: SandboxRepositoryPort,
    @Inject(SANDBOX_SERVICE_REPOSITORY)
    private readonly sandboxServiceRepository: SandboxServiceRepositoryPort,
  ) {}

  async createSandbox(dto: CreateSandboxRequestDto): Promise<void> {
    const sandbox = SandboxEntity.create(dto.name);
    await this.runtime.createSandbox(sandbox);
    await this.repository.createSandbox(sandbox);
    this.validateServices();
    sandbox.deployService(new SandboxService({ name: 'pdf' }));
    // publish event?
  }

  private validateServices() {
    const validServices = this.sandboxServiceRepository.getValidService();
    if (!validServices.some((service) => service.name === 'pdf')) {
      throw new SandboxServiceIsInvalidError();
    }
  }
}
