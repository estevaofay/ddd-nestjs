import { SandboxEntity } from '../domain/sandbox.entity';
import { Transaction } from 'sequelize';

export interface SandboxRepositoryPort {
  createSandbox(
    sandbox: SandboxEntity,
    transaction?: Transaction,
  ): Promise<SandboxEntity> | SandboxEntity;

  findAllSandboxes(): Promise<SandboxEntity[]> | SandboxEntity[];
}
