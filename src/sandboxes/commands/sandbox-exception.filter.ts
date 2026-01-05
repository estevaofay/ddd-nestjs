import { Catch, ConflictException, ExceptionFilter } from '@nestjs/common';
import {
  SandboxAlreadyExistsError,
  SandboxError,
} from '@src/sandboxes/domain/sandbox.errors';

@Catch(SandboxError)
export class SandboxExceptionFilter implements ExceptionFilter {
  catch(exception: SandboxError) {
    if (exception instanceof SandboxAlreadyExistsError)
      throw new ConflictException(exception.message);
    throw exception;
  }
}
