import {
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
} from '@nestjs/common';
import { SandboxServiceIsInvalidError } from '@src/sandboxes/domain/sandbox-service';
import {
  SandboxAlreadyExistsError,
  SandboxError,
} from '@src/sandboxes/domain/sandbox/errors';

@Catch(SandboxError)
export class SandboxExceptionFilter implements ExceptionFilter {
  catch(exception: SandboxError) {
    if (exception instanceof SandboxAlreadyExistsError)
      throw new ConflictException(exception.message);
    if (exception instanceof SandboxServiceIsInvalidError) {
      throw new BadRequestException(exception.message);
    }
    throw exception;
  }
}
