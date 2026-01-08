import { SandboxService } from '@src/sandboxes/domain/sandbox-service';

export class DeploySandboxServiceEvent {
  readonly sandboxName: string;
  readonly service: SandboxService;
  constructor(sandboxName: string, service: SandboxService) {
    this.sandboxName = sandboxName;
    this.service = service;
  }
}
