import { Module, Provider } from '@nestjs/common';
import { CreateSandboxHttpController } from './commands/create-sandbox/create-sandbox.http.controller';
import { CreateSandboxService } from './commands/create-sandbox/create-sandbox.service';
import { SANDBOX_REPOSITORY, SANDBOX_RUNTIME } from './sandboxes.di-tokens';
import { KubernetesSandboxRuntime } from './runtime/kubernetes.runtime';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sandbox } from './models/sandbox.model';
import { SandboxMapper } from './sandbox.mapper';
import { InMemorySandboxRepository } from '@src/sandboxes/repository/in-memory.sandbox.repository';
import { FindSandboxesHttpController } from '@src/sandboxes/queries/find-sandboxes/find-sandboxes.http.controller';
import { FindSandboxesService } from '@src/sandboxes/queries/find-sandboxes/find-sandboxes.service';
import {
  CreateApplicationServicesFromSandboxCreatedEventHandler
} from '@src/sandboxes/application/event-handlers/create-sandbox-services-from-sandbox-creation.event-handler';
import {
  CreateInfraServicesFromSandboxCreatedEventHandler
} from '@src/sandboxes/application/event-handlers/create-infra-services-from-sandbox-creation.event-handler';

const runtimes: Provider[] = [
  {
    provide: SANDBOX_RUNTIME,
    useClass: KubernetesSandboxRuntime,
  },
];

const repositories: Provider[] = [
  {
    provide: SANDBOX_REPOSITORY,
    useClass: InMemorySandboxRepository,
  },
];

@Module({
  imports: [SequelizeModule.forFeature([Sandbox])],
  controllers: [CreateSandboxHttpController, FindSandboxesHttpController],
  providers: [
    CreateSandboxService,
    FindSandboxesService,
    CreateApplicationServicesFromSandboxCreatedEventHandler,
    CreateInfraServicesFromSandboxCreatedEventHandler,
    SandboxMapper,
    ...runtimes,
    ...repositories,
  ],
})
export class SandboxesModule {}
