import { Controller, Get, Logger, UseFilters } from '@nestjs/common';
import { routesV1 } from '@config/routes';
import { ApiOperation } from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';
import { FindSandboxesService } from '@src/sandboxes/use-cases/find-sandboxes/find-sandboxes.service';
import { SandboxExceptionFilter } from '@src/sandboxes/use-cases/sandbox-exception.filter';
import { SandboxResponseDto } from '@src/sandboxes/use-cases/sandbox-response.dto';

@Controller(routesV1.version)
@UseFilters(new SandboxExceptionFilter())
export class FindSandboxesHttpController {
  private readonly logger = new Logger(FindSandboxesHttpController.name);

  constructor(private readonly service: FindSandboxesService) {}

  @Get(routesV1.sandbox.find)
  @ApiOperation({ summary: 'Find sandboxes' })
  @ZodResponse({ type: [SandboxResponseDto] })
  async findSandboxes(): Promise<SandboxResponseDto[]> {
    return await this.service.findSandboxes();
  }
}
