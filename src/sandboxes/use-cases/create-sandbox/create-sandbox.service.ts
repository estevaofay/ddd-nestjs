import { Inject } from '@nestjs/common';
import { type SandboxRuntimePort } from '@src/sandboxes/infrastructure/runtime';
import { type SandboxRepositoryPort } from '@src/sandboxes/infrastructure/database/sandbox';
import { SandboxEntity } from '@src/sandboxes/domain/sandbox';
import { CreateSandboxRequestDto } from '@src/sandboxes/use-cases/create-sandbox/create-sandbox.request.dto';
import { SANDBOX_REPOSITORY } from '@src/sandboxes/infrastructure/database/sandbox/sandbox.di-tokens';
import { SANDBOX_RUNTIME } from '@src/sandboxes/infrastructure/runtime/runtime.di-tokens';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SandboxCreatedEvent } from '@src/sandboxes/domain/sandbox/events';

export class CreateSandboxService {
  constructor(
    @Inject(SANDBOX_RUNTIME) private readonly runtime: SandboxRuntimePort,
    @Inject(SANDBOX_REPOSITORY)
    private readonly repository: SandboxRepositoryPort,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createSandbox(dto: CreateSandboxRequestDto): Promise<void> {
    const sandbox = SandboxEntity.create(dto);
    await this.runtime.createSandbox(sandbox);
    await this.repository.createSandbox(sandbox);
    this.eventEmitter.emit('sandbox_created', new SandboxCreatedEvent(sandbox));
  }
}
