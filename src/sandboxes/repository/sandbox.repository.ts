import { Injectable } from '@nestjs/common';
import { SandboxRepositoryPort } from './sandbox.repository.port';
import { Sandbox } from '../models/sandbox.model';
import { InjectModel } from '@nestjs/sequelize';
import { SandboxEntity } from '../domain/sandbox.entity';
import { SandboxMapper } from '../sandbox.mapper';
import { Transaction } from 'sequelize';

@Injectable()
export class SandboxRepository implements SandboxRepositoryPort {
  constructor(
    @InjectModel(Sandbox) private readonly sandboxModel: typeof Sandbox,
    private readonly mapper: SandboxMapper,
  ) {}

  async createSandbox(
    sandbox: SandboxEntity,
    transaction?: Transaction,
  ): Promise<SandboxEntity> {
    const sandboxModel = await this.sandboxModel.create(
      { name: sandbox.getName() },
      { transaction },
    );
    return this.mapper.toDomain(sandboxModel);
  }

  async findAllSandboxes(): Promise<SandboxEntity[]> {
    const sandboxes = await this.sandboxModel.findAll();
    return sandboxes.map((sandbox) => this.mapper.toDomain(sandbox));
  }
}
