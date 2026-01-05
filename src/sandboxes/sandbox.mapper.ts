import { Injectable, NotImplementedException } from '@nestjs/common';
import { SandboxEntity } from './domain/sandbox.entity';
import { Sandbox as SandboxModel } from './models/sandbox.model';
import { Mapper } from '@libs/ddd/mapper.interface';
import { SandboxName } from '@src/sandboxes/domain/value-objects/sandbox-name';
import { SandboxResponseDto } from '@src/sandboxes/dtos/sandbox-response.dto';

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
    };
  }
}
