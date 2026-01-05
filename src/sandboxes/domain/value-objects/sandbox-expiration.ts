export class SandboxExpiration {
  private readonly expiration: string;

  constructor(expiration?: Date | string) {
    if (!expiration) {
      this.expiration = new Date().toISOString();
      return;
    }

    if (typeof expiration !== 'string') {
      this.expiration = expiration?.toISOString();
      return;
    }

    this.expiration = expiration;
  }

  public getISODate(): string {
    return this.expiration;
  }

  public getDate(): Date {
    return new Date(this.expiration);
  }
}
