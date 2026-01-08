import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { SandboxCreatedEvent } from '@src/sandboxes/domain/sandbox/events';
import { DeploySandboxServiceEvent } from '@src/sandboxes/domain/sandbox-service/events/deploy-sandbox-service.event';

@Injectable()
export class DeploySandboxServicesService {
  private readonly logger = new Logger(DeploySandboxServicesService.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  @OnEvent('sandbox_created', { async: true })
  deployApplications(event: SandboxCreatedEvent) {
    event.services.map((service) =>
      this.eventEmitter.emit(
        'deploy_sandbox_service',
        new DeploySandboxServiceEvent(event.sandbox.getName(), service),
      ),
    );
  }

  @OnEvent('deploy_sandbox_service', { async: true })
  deployApplication(event: DeploySandboxServiceEvent) {
    this.logger.log(`Deploy ${event.service.name}`);
  }
}
