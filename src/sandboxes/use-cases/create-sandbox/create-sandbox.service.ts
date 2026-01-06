import { Inject, Logger } from '@nestjs/common';
import { type SandboxRuntimePort } from '../../runtime/runtime.port';
import { SANDBOX_REPOSITORY, SANDBOX_RUNTIME } from '../../sandboxes.di-tokens';
import { Sequelize } from 'sequelize-typescript';
import { type SandboxRepositoryPort } from '@src/sandboxes/repository/sandbox.repository.port';
import { SandboxEntity } from '@src/sandboxes/domain/sandbox.entity';
import { CreateSandboxRequestDto } from '@src/sandboxes/use-cases/create-sandbox/create-sandbox.request.dto';

export class CreateSandboxService {
  private readonly logger = new Logger(CreateSandboxService.name);

  constructor(
    @Inject(SANDBOX_RUNTIME) private readonly runtime: SandboxRuntimePort,
    @Inject(SANDBOX_REPOSITORY)
    private readonly repository: SandboxRepositoryPort,
  ) {}

  async createSandbox(dto: CreateSandboxRequestDto): Promise<void> {
    const sandbox = SandboxEntity.create(dto.name);
    await this.runtime.createSandbox(sandbox);
    await this.repository.createSandbox(sandbox);
    // publish event?
  }
}
