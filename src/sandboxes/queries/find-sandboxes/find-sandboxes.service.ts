import { FindSandboxesQuery } from '@src/sandboxes/queries/find-sandboxes/find-sandboxes.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SANDBOX_REPOSITORY } from '@src/sandboxes/sandboxes.di-tokens';
import { type SandboxRepositoryPort } from '@src/sandboxes/repository/sandbox.repository.port';
import { SandboxResponseDto } from '@src/sandboxes/dtos/sandbox-response.dto';
import { SandboxEntity } from '@src/sandboxes/domain/sandbox.entity';
import { SandboxMapper } from '@src/sandboxes/sandbox.mapper';

@QueryHandler(FindSandboxesQuery)
export class FindSandboxesService implements IQueryHandler<FindSandboxesQuery> {
  constructor(
    @Inject(SANDBOX_REPOSITORY)
    private readonly repository: SandboxRepositoryPort,
    private readonly mapper: SandboxMapper,
  ) {}

  async execute(): Promise<SandboxResponseDto[]> {
    const sandboxes: SandboxEntity[] = await this.repository.findAllSandboxes();
    return sandboxes.map((sandbox) => this.mapper.toResponse(sandbox));
  }
}
