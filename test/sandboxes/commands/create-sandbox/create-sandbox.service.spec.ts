import { Test, TestingModule } from '@nestjs/testing';
import { CreateSandboxService } from '@src/sandboxes/commands/create-sandbox/create-sandbox.service';
import { SandboxRuntimePort } from '@src/sandboxes/runtime/runtime.port';
import { SandboxRepository } from '@src/sandboxes/repository/sandbox.repository';
import {
  SANDBOX_REPOSITORY,
  SANDBOX_RUNTIME,
} from '@src/sandboxes/sandboxes.di-tokens';
import { CreateSandboxCommand } from '@src/sandboxes/commands/create-sandbox/create-sandbox.command';
import { createMock } from '@golevelup/ts-jest';
import { SandboxRepositoryPort } from '@src/sandboxes/repository/sandbox.repository.port';
import { SandboxEntity } from '@src/sandboxes/domain/sandbox.entity';

describe('CreateSandboxService', () => {
  let service: CreateSandboxService;
  let runtime: jest.Mocked<SandboxRuntimePort>;
  let repository: jest.Mocked<SandboxRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSandboxService,
        {
          provide: SANDBOX_RUNTIME,
          useValue: createMock<SandboxRuntimePort>(),
        },
        {
          provide: SANDBOX_REPOSITORY,
          useValue: createMock<SandboxRepositoryPort>(),
        },
      ],
    }).compile();

    service = await module.resolve(CreateSandboxService);
    runtime = await module.resolve(SANDBOX_RUNTIME);
    repository = await module.resolve(SANDBOX_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create sandbox in runtime and persist it', async () => {
    // Given
    const command = new CreateSandboxCommand({ name: 'test-sandbox' });

    runtime.createSandbox.mockResolvedValue(undefined);
    repository.createSandbox.mockResolvedValue({} as SandboxEntity);

    // When
    await service.execute(command);

    // Then
    expect(runtime.createSandbox).toHaveBeenCalledTimes(1);
    expect(runtime.createSandbox).toHaveBeenCalledWith('test-sandbox');

    expect(repository.createSandbox).toHaveBeenCalledTimes(1);
    expect(repository.createSandbox).toHaveBeenCalledWith('test-sandbox');
  });
});
