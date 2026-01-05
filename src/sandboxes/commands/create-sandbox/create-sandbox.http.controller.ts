import { Body, Controller, Logger, Post, UseFilters } from '@nestjs/common';
import { routesV1 } from '@config/routes';
import { CreateSandboxRequestDto } from './create-sandbox.request.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSandboxCommand } from './create-sandbox.command';
import { SandboxExceptionFilter } from '@src/sandboxes/commands/sandbox-exception.filter';

@Controller(routesV1.version)
@UseFilters(new SandboxExceptionFilter())
export class CreateSandboxHttpController {
  private readonly logger = new Logger(CreateSandboxHttpController.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.sandbox.create)
  async createSandbox(@Body() body: CreateSandboxRequestDto): Promise<void> {
    const command = new CreateSandboxCommand(body);
    await this.commandBus.execute(command);
  }
}
