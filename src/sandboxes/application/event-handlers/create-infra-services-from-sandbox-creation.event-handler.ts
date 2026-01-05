import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SandboxCreatedEvent } from '@src/sandboxes/domain/events/sandbox-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(SandboxCreatedEvent)
export class CreateInfraServicesFromSandboxCreatedEventHandler implements IEventHandler<SandboxCreatedEvent> {
  private readonly logger = new Logger(
    CreateInfraServicesFromSandboxCreatedEventHandler.name,
  );

  constructor() {}

  handle(event: SandboxCreatedEvent) {
    this.logger.log('event triggered222');
    this.logger.log(event);
  }
}
