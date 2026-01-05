import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { type CreationOptional } from 'sequelize';
import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'sandboxes',
})
export class Sandbox extends Model<
  InferAttributes<Sandbox>,
  InferCreationAttributes<Sandbox>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @Column
  name: string;
}
