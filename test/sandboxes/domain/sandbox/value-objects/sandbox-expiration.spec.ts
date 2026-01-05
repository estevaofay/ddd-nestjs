import { SandboxEntity } from '@src/sandboxes/domain/sandbox.entity';
import { SandboxName } from '@src/sandboxes/domain/value-objects/sandbox-name';

describe('SandboxExpiration', () => {
  it('should be defined', () => {
    // Given
    const name = new SandboxName('dev-123');
    // When
    const sandbox = new SandboxEntity(name);

    // Then
    expect(sandbox.getName()).toBe('dev-123');
  });
});
