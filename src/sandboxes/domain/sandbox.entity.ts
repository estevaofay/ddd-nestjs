import { SandboxName } from '@src/sandboxes/domain/value-objects/sandbox-name';

export class SandboxEntity {
  constructor(private readonly name: SandboxName) {}

  static create(name?: string) {
    return new SandboxEntity(new SandboxName(name));
  }

  getName(): string {
    return this.name.unpack();
  }
}
