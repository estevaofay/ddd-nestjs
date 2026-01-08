// import {
//   type CreationOptional,
//   InferAttributes,
//   InferCreationAttributes,
// } from 'sequelize';
// import {
//   AutoIncrement,
//   Column,
//   DataType,
//   Model,
//   PrimaryKey,
//   Table,
// } from 'sequelize-typescript';
//
// @Table({
//   tableName: 'sandbox_service',
// })
// export class SandboxServiceModel extends Model<
//   InferAttributes<SandboxServiceModel>,
//   InferCreationAttributes<SandboxServiceModel>
// > {
//   @PrimaryKey
//   @AutoIncrement
//   @Column(DataType.INTEGER)
//   id: CreationOptional<number>;
//
//   @Column
//   name: string;
//
//   isValid: boolean;
// }
