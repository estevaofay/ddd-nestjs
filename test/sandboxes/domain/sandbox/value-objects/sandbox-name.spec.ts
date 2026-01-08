import { SandboxName } from '@src/sandboxes/domain/sandbox/value-objects';
import { SandboxEntity } from '@src/sandboxes/domain/sandbox';

describe('SandboxName', () => {
  it('should be defined', () => {
    // Given
    const name = new SandboxName('dev-123');
    // When
    const sandbox = new SandboxEntity(name);

    // Then
    expect(sandbox.getName()).toBe('dev-123');
  });

  it('should create sandbox using static create method', () => {
    // When
    const sandbox = SandboxEntity.create('dev-123');

    // Then
    expect(sandbox.getName()).toBe('dev-123');
  });

  it('should create sandbox using static create method', () => {
    // When
    const sandbox = SandboxEntity.create();

    // Then
    expect(sandbox.getName().startsWith('dev-')).toBe(true);
    expect(sandbox.getName().length).toBe(14);
  });
});
