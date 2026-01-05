import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSandboxHttpController } from '@src/sandboxes/commands/create-sandbox/create-sandbox.http.controller';
import { CreateSandboxRequestDto } from '@src/sandboxes/commands/create-sandbox/create-sandbox.request.dto';
import { CreateSandboxCommand } from '@src/sandboxes/commands/create-sandbox/create-sandbox.command';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Ok } from 'oxide.ts';

describe('CreateSandboxHttpController', () => {
  let controller: CreateSandboxHttpController;
  let commandBus: DeepMocked<CommandBus>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateSandboxHttpController],
      providers: [
        {
          provide: CommandBus,
          useValue: createMock<CommandBus>(),
        },
      ],
    }).compile();

    controller = module.get(CreateSandboxHttpController);
    commandBus = module.get(CommandBus);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should execute CreateSandboxCommand with request body', async () => {
    // Given
    const body: CreateSandboxRequestDto = {
      name: 'test-sandbox',
    };
    commandBus.execute.mockResolvedValue(Ok('1'));

    // When
    await controller.createSandbox(body);

    // Then
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
    expect(commandBus.execute).toHaveBeenCalledWith(
      expect.any(CreateSandboxCommand),
    );

    const command = commandBus.execute.mock.calls[0][0] as CreateSandboxCommand;
    expect(command).toEqual(new CreateSandboxCommand(body));
  });
});
