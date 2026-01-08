export class SandboxService {
  readonly #name: string;
  readonly #isValid: boolean;

  constructor({ name, isValid = true }: { name: string; isValid?: boolean }) {
    this.#name = name;
    this.#isValid = isValid;
  }

  get name(): string {
    return this.#name;
  }

  get isValid(): boolean {
    return this.#isValid;
  }
}
