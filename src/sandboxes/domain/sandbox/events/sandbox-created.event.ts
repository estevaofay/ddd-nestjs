export class SandboxCreatedEvent {
  private readonly services: string[];

  constructor(services: string[]) {
    this.services = services;
  }
}
