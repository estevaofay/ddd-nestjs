import { Transaction } from 'sequelize';
import { SandboxEntity } from '@src/sandboxes/domain/sandbox';

export interface SandboxRepositoryPort {
  createSandbox(
    sandbox: SandboxEntity,
    transaction?: Transaction,
  ): Promise<SandboxEntity> | SandboxEntity;

  findAllSandboxes(): Promise<SandboxEntity[]> | SandboxEntity[];
}
