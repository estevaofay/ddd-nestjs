import { Body, Controller, Logger, Post, UseFilters } from '@nestjs/common';
import { routesV1 } from '@config/routes';
import { CreateSandboxRequestDto } from './create-sandbox.request.dto';
import { CreateSandboxService } from '@src/sandboxes/use-cases/create-sandbox/create-sandbox.service';
import { SandboxExceptionFilter } from '@src/sandboxes/use-cases/sandbox-exception.filter';

@Controller(routesV1.version)
@UseFilters(new SandboxExceptionFilter())
export class CreateSandboxHttpController {
  private readonly logger = new Logger(CreateSandboxHttpController.name);

  constructor(private readonly service: CreateSandboxService) {}

  @Post(routesV1.sandbox.create)
  async createSandbox(@Body() body: CreateSandboxRequestDto): Promise<void> {
    await this.service.createSandbox(body);
  }
}
