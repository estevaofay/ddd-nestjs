import { Inject } from '@nestjs/common';
import { type SandboxRepositoryPort } from '@src/sandboxes/infrastructure/database/sandbox';
import { SandboxEntity, SandboxMapper } from '@src/sandboxes/domain/sandbox';
import { SandboxResponseDto } from '@src/sandboxes/use-cases/sandbox-response.dto';
import { SANDBOX_REPOSITORY } from '@src/sandboxes/infrastructure/database/sandbox/sandbox.di-tokens';

export class FindSandboxesService {
  constructor(
    @Inject(SANDBOX_REPOSITORY)
    private readonly repository: SandboxRepositoryPort,
    private readonly mapper: SandboxMapper,
  ) {}

  async findSandboxes(): Promise<SandboxResponseDto[]> {
    const sandboxes: SandboxEntity[] = await this.repository.findAllSandboxes();
    return sandboxes.map((sandbox) => this.mapper.toResponse(sandbox));
  }
}
