import { Logger } from '@nestjs/common';
import {
  ApiException,
  CoreV1Api,
  KubeConfig,
  V1Status,
} from '@kubernetes/client-node';
import { ObjectCoreV1Api } from '@kubernetes/client-node/dist/gen/types/ObjectParamAPI';
import { SandboxEntity } from '@src/sandboxes/domain/sandbox';
import { SandboxAlreadyExistsError } from '@src/sandboxes/domain/sandbox/errors';
import { SandboxRuntimePort } from '@src/sandboxes/infrastructure/runtime';

export class KubernetesSandboxRuntime implements SandboxRuntimePort {
  private readonly logger = new Logger(KubernetesSandboxRuntime.name);
  private readonly _kubeConfig: KubeConfig;
  private readonly kubernetes: ObjectCoreV1Api;

  constructor() {
    this._kubeConfig = new KubeConfig();
    this._kubeConfig.loadFromDefault();
    this._kubeConfig.setCurrentContext('homelab');
    this.kubernetes = this._kubeConfig.makeApiClient(CoreV1Api);
  }

  async createSandbox(sandbox: SandboxEntity): Promise<void> {
    try {
      await this.kubernetes.createNamespace({
        body: { metadata: { name: sandbox.getName() } },
      });
    } catch (err) {
      if (err instanceof ApiException) {
        const errorBody = JSON.parse(err.body) as V1Status;
        if (409 === errorBody['code']) {
          throw new SandboxAlreadyExistsError();
        }
      }
      throw err;
    }
  }
}
