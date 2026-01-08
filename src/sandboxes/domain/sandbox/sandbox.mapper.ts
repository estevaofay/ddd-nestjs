import { Injectable } from '@nestjs/common';
// import { Sandbox as SandboxModel } from '@src/sandboxes/infrastructure/database/sandbox/sandbox.model';
import { SandboxEntity } from '@src/sandboxes/domain/sandbox/sandbox.entity';
import { SandboxResponseDto } from '@src/sandboxes/use-cases/sandbox-response.dto';
import { Mapper } from '@libs/ddd';

// import { SandboxServiceModel } from '@src/sandboxes/infrastructure/database/sandbox/sandbox-service.model';

@Injectable()
export class SandboxMapper implements Mapper<
  SandboxEntity,
  // SandboxModel,
  SandboxResponseDto
> {
  // toPersistence(entity: SandboxEntity): SandboxModel {
  //   throw new NotImplementedException(entity);
  // }

  // toDomain(model: SandboxModel): SandboxEntity {
  //   const services: SandboxService[] = model.services.map(
  //     (service: SandboxServiceModel) => {
  //       return new SandboxService({ name: service.name });
  //     },
  //   );
  //   return new SandboxEntity(new SandboxName(model.name), services);
  // }

  toResponse(entity: SandboxEntity): SandboxResponseDto {
    return {
      name: entity.getName(),
      services: entity.services.map((service) => {
        return { name: service.name };
      }),
    };
  }
}
