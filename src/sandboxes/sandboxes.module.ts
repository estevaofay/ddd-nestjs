import { Module, Provider } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  InMemorySandboxRuntime,
  SANDBOX_RUNTIME,
} from '@src/sandboxes/infrastructure/runtime';
import {
  InMemorySandboxRepository,
  SANDBOX_REPOSITORY,
} from '@src/sandboxes/infrastructure/database/sandbox';
import {
  InMemorySandboxServiceRepository,
  SANDBOX_SERVICE_REPOSITORY,
} from '@src/sandboxes/infrastructure/database/sandbox-service';
import { Sandbox } from '@src/sandboxes/infrastructure/database/sandbox/sandbox.model';
import {
  FindSandboxesHttpController,
  FindSandboxesService,
} from '@src/sandboxes/use-cases/find-sandboxes';
import {
  CreateSandboxHttpController,
  CreateSandboxService,
} from '@src/sandboxes/use-cases/create-sandbox';
import { SandboxMapper } from '@src/sandboxes/domain/sandbox/sandbox.mapper';

const runtimes: Provider[] = [
  // {
  //   provide: SANDBOX_RUNTIME,
  //   useClass: KubernetesSandboxRuntime,
  // },
  {
    provide: SANDBOX_RUNTIME,
    useClass: InMemorySandboxRuntime,
  },
];

const repositories: Provider[] = [
  {
    provide: SANDBOX_REPOSITORY,
    useClass: InMemorySandboxRepository,
  },
  {
    provide: SANDBOX_SERVICE_REPOSITORY,
    useClass: InMemorySandboxServiceRepository,
  },
];

@Module({
  imports: [SequelizeModule.forFeature([Sandbox])],
  controllers: [CreateSandboxHttpController, FindSandboxesHttpController],
  providers: [
    CreateSandboxService,
    FindSandboxesService,
    SandboxMapper,
    ...runtimes,
    ...repositories,
  ],
})
export class SandboxesModule {}
