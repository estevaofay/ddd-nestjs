export interface Mapper<DomainEntity, DbRecord, Response> {
  toPersistence(entity: DomainEntity): DbRecord;
  toDomain(record): DomainEntity;
  toResponse(entity: DomainEntity): Response;
}
