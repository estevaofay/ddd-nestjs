import { Provider } from '@nestjs/common';
import { SANDBOX_RUNTIME } from '@src/sandboxes/infrastructure/runtime/runtime.di-tokens';
import { InMemorySandboxRuntime } from '@src/sandboxes/infrastructure/runtime/in-memory/in-memory.runtime';

export * from './in-memory/in-memory.runtime';
export * from './kubernetes/kubernetes.runtime';
export * from './runtime.port';
export * from './runtime.di-tokens';

export const runtimeProviders: Provider[] = [
  {
    provide: SANDBOX_RUNTIME,
    useClass: InMemorySandboxRuntime,
  },
];
