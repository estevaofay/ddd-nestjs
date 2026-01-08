// export interface Mapper<DomainEntity, DbRecord, Response> {
//   toPersistence(entity: DomainEntity): DbRecord;
//   toDomain(record): DomainEntity;
//   toResponse(entity: DomainEntity): Response;
// }

export interface Mapper<DomainEntity, Response> {
  toResponse(entity: DomainEntity): Response;
}
