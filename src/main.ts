import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import morgan from 'morgan';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ConfigService } from './core/config/config.service';
import { AppLogger } from './core/logger/app-logger.service';

async function bootstrap() {
  const appOptions: NestApplicationOptions = {
    logger: console,
  };
  const app: NestExpressApplication = await NestFactory.create(
    AppModule,
    appOptions,
  );
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  /**
   * Swagger
   */
  const options = new DocumentBuilder()
    .setTitle('NestJS REST API')
    .setDescription('REST API based on NestJS')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  /**
   * Static assets
   */
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    index: false,
    prefix: '/public',
  });

  /**
   * Configuration
   */
  const configService = app.get(ConfigService);
  const appLogger = app.get(AppLogger);
  const morganFormat = ConfigService.isProduction() ? 'combined' : 'dev';

  app.use(morgan(morganFormat, appLogger.morganOption));
  app.use(helmet());
  app.useLogger(appLogger);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  appLogger.log(`Logger level = ${configService.logLevel}`, 'App');
  appLogger.log(`Listening to ${configService.expressPort}`, 'App');

  await app.listen(configService.expressPort);
}

bootstrap();
