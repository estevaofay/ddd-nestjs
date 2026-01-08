import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const SandboxServiceResponseSchema = z.object({
  name: z.string(),
});

const SandboxResponseSchema = z.object({
  name: z.string(),
  services: z.array(SandboxServiceResponseSchema),
});

export class SandboxResponseDto extends createZodDto(SandboxResponseSchema) {}
