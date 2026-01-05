import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SandboxCreatedEvent } from '@src/sandboxes/domain/events/sandbox-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(SandboxCreatedEvent)
export class CreateApplicationServicesFromSandboxCreatedEventHandler implements IEventHandler<SandboxCreatedEvent> {
  private readonly logger = new Logger(
    CreateApplicationServicesFromSandboxCreatedEventHandler.name,
  );

  constructor() {}

  async handle(event: SandboxCreatedEvent) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.logger.log('event triggered');
    this.logger.log(event);
  }
}
