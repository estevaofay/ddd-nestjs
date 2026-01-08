import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'sqlite',
  storage: './db.sqlite',
  database: 'giger',
  synchronize: true,
  autoLoadModels: true,
  logging: false,
};
