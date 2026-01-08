import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const CreateSandboxSchema = z.object({
  name: z.string().optional(),
  services: z.array(
    z.object({
      name: z.string(),
    }),
  ),
});

export class CreateSandboxRequestDto extends createZodDto(
  CreateSandboxSchema,
) {}
