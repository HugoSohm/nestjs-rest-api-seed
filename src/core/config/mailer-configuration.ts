import * as dotenv from 'dotenv';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerOptions } from '@nestjs-modules/mailer';

function getMailer(): MailerOptions {
  if (!(process.env.NODE_ENV === 'production')) {
    dotenv.config({ path: '.env.dev' });
  }

  return {
    transport: {
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      secure: false,
      auth: {
        user: process.env.MAILER_AUTH_USER,
        pass: process.env.MAILER_AUTH_PASS,
      },
    },
    defaults: {
      from: process.env.MAILER_FROM,
    },
    template: {
      dir: `${process.cwd()}/src/core/mail/template/`,
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  };
}

const mailerConfiguration = getMailer();
export = mailerConfiguration;
