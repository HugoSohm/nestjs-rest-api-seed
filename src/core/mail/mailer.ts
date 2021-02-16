import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersEntity } from '../../features/users/users.entity';

@Injectable()
export class Mailer {
  private logger: Logger = new Logger(Mailer.name);

  constructor(private readonly mailerService: MailerService) {}

  public sendMail(user: UsersEntity): Promise<void | HttpStatus> {
    return this.mailerService
      .sendMail({
        to: user.email,
        from: 'no-reply@example.com',
        subject: 'Reset your password',
        template: 'index',
        context: {
          firstName: user.firstName,
          link: `https://example.com/reset-password/${user.id}`,
        },
      })
      .then(() => {
        return HttpStatus.OK;
      })
      .catch(err => {
        this.logger.error(err);
      });
  }
}
