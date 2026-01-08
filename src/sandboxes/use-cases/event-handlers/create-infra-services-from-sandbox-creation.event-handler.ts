import { Logger } from '@nestjs/common';
import { SandboxCreatedEvent } from '@src/sandboxes/domain/sandbox/events';

export class CreateInfraServicesFromSandboxCreatedEventHandler {
  private readonly logger = new Logger(
    CreateInfraServicesFromSandboxCreatedEventHandler.name,
  );

  constructor() {}

  handle(event: SandboxCreatedEvent) {
    this.logger.log('event triggered222');
    this.logger.log(event);
  }
}
