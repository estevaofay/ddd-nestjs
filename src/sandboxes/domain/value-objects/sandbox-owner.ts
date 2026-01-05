export class SandboxOwner {
  private readonly name: string;

  constructor(name?: string) {
    if (!name) {
      this.name = `dev-${this.generateRandomId(10)}`;
      return;
    }
    this.name = name;
  }

  private generateRandomId(length: number): string {
    const chars = 'abcdefghijklmnopqrstivwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
