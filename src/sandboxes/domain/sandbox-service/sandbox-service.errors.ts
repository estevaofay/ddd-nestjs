import { SandboxError } from '@src/sandboxes/domain/sandbox/errors';

export class SandboxServiceError extends SandboxError {
  static readonly message = 'Sandbox Service Error';

  constructor() {
    super(SandboxServiceError.message);
  }
}

export class SandboxServiceIsInvalidError extends SandboxError {
  static readonly message = 'Sandbox Service is invalid';

  constructor() {
    super(SandboxServiceError.message);
  }
}
