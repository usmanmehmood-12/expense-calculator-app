import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPasswordResetEmail(to: string, temporaryPassword: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Password Reset',
      template: 'password-reset', // name of the email template file without extension
      context: {
        temporaryPassword,
      },
    });
  }
}
