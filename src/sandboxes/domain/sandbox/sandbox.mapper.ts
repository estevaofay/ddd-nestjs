import { Injectable, NotImplementedException } from '@nestjs/common';
import { Sandbox as SandboxModel } from '@src/sandboxes/infrastructure/database/sandbox/sandbox.model';
import { SandboxEntity } from '@src/sandboxes/domain/sandbox/sandbox.entity';
import { SandboxResponseDto } from '@src/sandboxes/use-cases/sandbox-response.dto';
import { SandboxName } from '@src/sandboxes/domain/sandbox/value-objects';
import { Mapper } from '@libs/ddd';

@Injectable()
export class SandboxMapper implements Mapper<
  SandboxEntity,
  SandboxModel,
  SandboxResponseDto
> {
  toPersistence(entity: SandboxEntity): SandboxModel {
    throw new NotImplementedException(entity);
  }

  toDomain(model: SandboxModel): SandboxEntity {
    return new SandboxEntity(new SandboxName(model.name));
  }

  toResponse(entity: SandboxEntity): SandboxResponseDto {
    return {
      name: entity.getName(),
      services: entity.services.map((service) => {
        return { name: service.name };
      }),
    };
  }
}
