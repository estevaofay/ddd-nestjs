import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { Provider } from '@nestjs/common';

export const zodValidationPipe: Provider = {
  provide: APP_PIPE,
  useClass: ZodValidationPipe,
};
