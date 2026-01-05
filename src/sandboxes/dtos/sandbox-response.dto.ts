import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const SandboxResponseSchema = z.object({
  name: z.string(),
});

export class SandboxResponseDto extends createZodDto(SandboxResponseSchema) {}
