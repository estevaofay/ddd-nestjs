import { Test, TestingModule } from '@nestjs/testing';
import { SandboxRuntimePort } from '@src/sandboxes/runtime/runtime.port';
import { SandboxRepository } from '@src/sandboxes/repository/sandbox.repository';
import {
  SANDBOX_REPOSITORY,
  SANDBOX_RUNTIME,
} from '@src/sandboxes/sandboxes.di-tokens';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { SandboxRepositoryPort } from '@src/sandboxes/repository/sandbox.repository.port';
import { SandboxEntity } from '@src/sandboxes/domain/sandbox.entity';
import { CreateSandboxService } from '@src/sandboxes/use-cases/create-sandbox/create-sandbox.service';
import { CreateSandboxRequestDto } from '@src/sandboxes/use-cases/create-sandbox/create-sandbox.request.dto';

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
