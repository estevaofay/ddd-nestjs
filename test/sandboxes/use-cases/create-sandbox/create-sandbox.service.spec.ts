import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { CreateSandboxService } from '@src/sandboxes/use-cases/create-sandbox/create-sandbox.service';
import { CreateSandboxRequestDto } from '@src/sandboxes/use-cases/create-sandbox/create-sandbox.request.dto';
import { SANDBOX_REPOSITORY } from '@src/sandboxes/infrastructure/database/sandbox/sandbox.di-tokens';
import { SANDBOX_RUNTIME } from '@src/sandboxes/infrastructure/runtime/runtime.di-tokens';
import { SandboxRuntimePort } from '@src/sandboxes/infrastructure/runtime';
import {
  SandboxRepository,
  SandboxRepositoryPort,
} from '@src/sandboxes/infrastructure/database/sandbox';
import { SandboxEntity } from '@src/sandboxes/domain/sandbox';
import { SANDBOX_SERVICE_REPOSITORY } from '@src/sandboxes/infrastructure/database/sandbox-service';

describe('CreateSandboxService', () => {
  let service: CreateSandboxService;
  let runtime: DeepMocked<SandboxRuntimePort>;
  let repository: DeepMocked<SandboxRepository>;

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
        {
          provide: SANDBOX_SERVICE_REPOSITORY,
          useValue: createMock<SandboxRepositoryPort>(),
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    service = await module.resolve(CreateSandboxService);
    runtime = await module.resolve(SANDBOX_RUNTIME);
    repository = await module.resolve(SANDBOX_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create sandbox in runtime and persist it', async () => {
    // Given
    const body: CreateSandboxRequestDto = {
      name: 'test-sandbox',
    };
    const sandbox = SandboxEntity.create(body.name);

    runtime.createSandbox.mockResolvedValue(undefined);
    repository.createSandbox.mockResolvedValue({} as SandboxEntity);

    // When
    await service.createSandbox(body);

    // Then
    expect(runtime.createSandbox).toHaveBeenCalledTimes(1);
    expect(runtime.createSandbox).toHaveBeenCalledWith(sandbox);
    expect(repository.createSandbox).toHaveBeenCalledTimes(1);
    expect(repository.createSandbox).toHaveBeenCalledWith(sandbox);
  });
});
