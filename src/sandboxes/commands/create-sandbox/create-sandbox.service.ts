import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import { CreateSandboxCommand } from './create-sandbox.command';
import { Inject, Logger } from '@nestjs/common';
import { type SandboxRuntimePort } from '../../runtime/runtime.port';
import { SANDBOX_REPOSITORY, SANDBOX_RUNTIME } from '../../sandboxes.di-tokens';
import { Sequelize } from 'sequelize-typescript';
import { type SandboxRepositoryPort } from '@src/sandboxes/repository/sandbox.repository.port';
import { SandboxEntity } from '@src/sandboxes/domain/sandbox.entity';
import { SandboxCreatedEvent } from '@src/sandboxes/domain/events/sandbox-created.event';

@CommandHandler(CreateSandboxCommand)
export class CreateSandboxService implements ICommandHandler<CreateSandboxCommand> {
  private readonly logger = new Logger(CreateSandboxService.name);

  constructor(
    @Inject(SANDBOX_RUNTIME) private readonly runtime: SandboxRuntimePort,
    @Inject(SANDBOX_REPOSITORY)
    private readonly repository: SandboxRepositoryPort,
    private eventBus: EventBus,
    private readonly sequelize: Sequelize,
  ) {}

  async execute(command: CreateSandboxCommand): Promise<void> {
    const sandbox = SandboxEntity.create(command.name);
    await this.sequelize.transaction(async (transaction) => {
      // await this.runtime.createSandbox(sandbox);
      await this.repository.createSandbox(sandbox, transaction);
    });
    this.eventBus.publish(new SandboxCreatedEvent(['accounts', 'pdf']));
  }
}
