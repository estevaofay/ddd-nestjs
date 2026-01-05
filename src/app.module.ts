import { Module, Provider } from '@nestjs/common';
import { SandboxesModule } from './sandboxes/sandboxes.module';
import { FeatureFlagsModule } from './feature-flags/feature-flags.module';
import { CqrsModule } from '@nestjs/cqrs';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerModule } from 'nestjs-pino';
import { ConditionalModule, ConfigModule } from '@nestjs/config';

const validationPipes: Provider[] = [
  {
    provide: APP_PIPE,
    useClass: ZodValidationPipe,
  },
];

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        messageKey: 'message',
        level: String(process.env.LOG_LEVEL || 'info').toLowerCase(),
        formatters: {
          level: (label) => ({ level: label.toUpperCase() }),
        },
      },
    }),
    CqrsModule.forRoot(),
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './db.sqlite',
      database: 'giger',
      synchronize: true,
      autoLoadModels: true,
      logging: false,
    }),
    ConditionalModule.registerWhen(SandboxesModule, 'FEATURE_SANDBOXES'),
    ConditionalModule.registerWhen(FeatureFlagsModule, 'FEATURE_FFLAGS'),
  ],
  providers: [...validationPipes],
})
export class AppModule {}
