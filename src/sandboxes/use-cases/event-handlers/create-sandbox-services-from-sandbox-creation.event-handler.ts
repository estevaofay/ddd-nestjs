import { Logger } from '@nestjs/common';
import { SandboxCreatedEvent } from '@src/sandboxes/domain/sandbox/events';

export class CreateApplicationServicesFromSandboxCreatedEventHandler {
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
