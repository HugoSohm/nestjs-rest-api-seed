import { Injectable, Logger } from '@nestjs/common';
import * as Joi from 'joi';
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MailerOptions } from '@nestjs-modules/mailer';
import databaseConfiguration from './database-configuration';
import mailerConfiguration from './mailer-configuration';
import { EnvConfig, LoggerLevel } from './type';

@Injectable()
export class ConfigService {
  private logger: Logger = new Logger(ConfigService.name);

  protected readonly envConfig: { [key: string]: string };

  constructor() {
    const baseSchema = {
      NODE_ENV: Joi.string()
        .valid(...['development', 'production', 'test'])
        .default('development'),
      LOG_LEVEL: Joi.string()
        .valid(...['debug', 'info', 'error', 'warn'])
        .default('info'),
      PORT: Joi.number().default(3000),
      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),
      POSTGRES_PORT: Joi.number(),
      POSTGRES_SHOW_SQL: Joi.bool().default(false),
      MAILER_HOST: Joi.string().default('smtp.gmail.com'),
      MAILER_PORT: Joi.string().default('587'),
      MAILER_FROM: Joi.string(),
      MAILER_AUTH_USER: Joi.string(),
      MAILER_HOST_PASS: Joi.string(),
    };

    if (!ConfigService.isProduction()) {
      const result = dotenv.config({ path: '.env.dev' });
      if (result.error) {
        throw result.error;
      }
    }
    this.envConfig = this.validateInput(baseSchema, process.env);
  }

  get expressPort(): number {
    return Number(this.envConfig.PORT);
  }

  get databaseConfiguration(): TypeOrmModuleOptions {
    return {
      ...databaseConfiguration,
    };
  }

  get mailerConfiguration(): MailerOptions {
    return {
      ...mailerConfiguration,
    };
  }

  static isProduction() {
    return process.env.NODE_ENV === 'production';
  }

  get logLevel(): LoggerLevel {
    return this.envConfig.LOG_LEVEL as LoggerLevel;
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(
    schema: Record<any, Joi.AnySchema>,
    envConfig: EnvConfig,
  ): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object(schema).options({
      stripUnknown: true,
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      this.logger.error(`Config validation error: ${error.message}`);
      // throw is catch on service creation
      process.exit(1);
    }
    return validatedEnvConfig;
  }
}
