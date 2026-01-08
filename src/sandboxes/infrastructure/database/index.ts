import { Provider } from '@nestjs/common';
import {
  InMemorySandboxRepository,
  SANDBOX_REPOSITORY,
} from '@src/sandboxes/infrastructure/database/sandbox';
import {
  InMemorySandboxServiceRepository,
  SANDBOX_SERVICE_REPOSITORY,
} from '@src/sandboxes/infrastructure/database/sandbox-service';

export const databaseRepositoryProviders: Provider[] = [
  {
    provide: SANDBOX_REPOSITORY,
    useClass: InMemorySandboxRepository,
  },
  {
    provide: SANDBOX_SERVICE_REPOSITORY,
    useClass: InMemorySandboxServiceRepository,
  },
];
