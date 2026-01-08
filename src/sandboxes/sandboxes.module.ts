import { Module } from '@nestjs/common';
import { runtimeProviders } from '@src/sandboxes/infrastructure/runtime';
// import { Sandbox } from '@src/sandboxes/infrastructure/database/sandbox/sandbox.model';
import {
  FindSandboxesHttpController,
  FindSandboxesService,
} from '@src/sandboxes/use-cases/find-sandboxes';
import {
  CreateSandboxHttpController,
  CreateSandboxService,
} from '@src/sandboxes/use-cases/create-sandbox';
import { SandboxMapper } from '@src/sandboxes/domain/sandbox/sandbox.mapper';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DeploySandboxServicesService } from '@src/sandboxes/use-cases/deploy-sandbox-services/deploy-sandbox-services.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from '@src/sandboxes/config/sequelize.config';
import { databaseRepositoryProviders } from '@src/sandboxes/infrastructure/database';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    SequelizeModule.forRoot(sequelizeConfig),
    // SequelizeModule.forFeature([Sandbox]),
  ],
  controllers: [CreateSandboxHttpController, FindSandboxesHttpController],
  providers: [
    CreateSandboxService,
    FindSandboxesService,
    SandboxMapper,
    DeploySandboxServicesService,
    ...databaseRepositoryProviders,
    ...runtimeProviders,
  ],
})
export class SandboxesModule {}
