import { Module, Provider } from '@nestjs/common';
import { SandboxesModule } from './sandboxes/sandboxes.module';
import { FeatureFlagsModule } from './feature-flags/feature-flags.module';
import { LoggerModule } from 'nestjs-pino';
import { ConditionalModule, ConfigModule } from '@nestjs/config';
import { zodValidationPipe } from '@src/pipes/zod-validation.pipe';
import { loggerConfig } from '@src/config';

const validationPipes: Provider[] = [zodValidationPipe];

@Module({
  imports: [
    LoggerModule.forRoot(loggerConfig),
    ConfigModule.forRoot(),
    ConditionalModule.registerWhen(SandboxesModule, 'FEATURE_SANDBOXES'),
    ConditionalModule.registerWhen(FeatureFlagsModule, 'FEATURE_FFLAGS'),
  ],
  providers: [...validationPipes],
})
export class AppModule {}
