import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppLogger } from './logger/app-logger.service';
import { ConfigService } from './config/config.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          ...configService.databaseConfiguration,
        };
      },
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          ...configService.mailerConfiguration,
        };
      },
    }),
  ],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class CoreModule {}
