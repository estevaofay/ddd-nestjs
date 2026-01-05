import { SandboxName } from '@src/sandboxes/domain/value-objects/sandbox-name';
import { AggregateRoot } from '@nestjs/cqrs';

export class SandboxEntity extends AggregateRoot {
  constructor(private readonly name: SandboxName) {
    super();
  }

  static create(name?: string) {
    return new SandboxEntity(new SandboxName(name));
  }

  getName(): string {
    return this.name.unpack();
  }
}
