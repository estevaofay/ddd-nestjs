import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { CreateSandboxHttpController } from '@src/sandboxes/use-cases/create-sandbox/create-sandbox.http.controller';
import { CreateSandboxService } from '@src/sandboxes/use-cases/create-sandbox/create-sandbox.service';
import { CreateSandboxRequestDto } from '@src/sandboxes/use-cases/create-sandbox/create-sandbox.request.dto';

describe('CreateSandboxHttpController', () => {
  let controller: CreateSandboxHttpController;
  let service: DeepMocked<CreateSandboxService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateSandboxHttpController],
      providers: [
        {
          provide: CreateSandboxService,
          useValue: createMock<CreateSandboxService>(),
        },
      ],
    }).compile();

    controller = module.get(CreateSandboxHttpController);
    service = module.get(CreateSandboxService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service with request valid dto', async () => {
    // Given
    const body: CreateSandboxRequestDto = {
      name: 'test-sandbox',
    };
    service.createSandbox.mockResolvedValue();

    // When
    await controller.createSandbox(body);

    // Then
    expect(service.createSandbox).toHaveBeenCalledTimes(1);
    expect(service.createSandbox).toHaveBeenCalledWith(body);
  });
});
