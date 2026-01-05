import { Controller, Get, Logger, UseFilters } from '@nestjs/common';
import { routesV1 } from '@config/routes';
import { QueryBus } from '@nestjs/cqrs';
import { SandboxExceptionFilter } from '@src/sandboxes/commands/sandbox-exception.filter';
import { FindSandboxesQuery } from '@src/sandboxes/queries/find-sandboxes/find-sandboxes.query';
import { ApiOperation } from '@nestjs/swagger';
import { SandboxResponseDto } from '@src/sandboxes/dtos/sandbox-response.dto';
import { ZodResponse } from 'nestjs-zod';

@Controller(routesV1.version)
@UseFilters(new SandboxExceptionFilter())
export class FindSandboxesHttpController {
  private readonly logger = new Logger(FindSandboxesHttpController.name);

  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.sandbox.find)
  @ApiOperation({ summary: 'Find sandboxes' })
  @ZodResponse({ type: [SandboxResponseDto] })
  async findSandboxes(): Promise<SandboxResponseDto[]> {
    const query = new FindSandboxesQuery();
    return await this.queryBus.execute(query);
  }
}
