export class SandboxError extends Error {
  static readonly message = 'Sandbox already exists';

  constructor(message: string) {
    super(message);
  }
}

export class SandboxAlreadyExistsError extends SandboxError {
  static readonly message = 'Sandbox already exists';

  constructor() {
    super(SandboxAlreadyExistsError.message);
  }
}
