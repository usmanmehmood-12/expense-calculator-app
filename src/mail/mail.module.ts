import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigService

@Module({
  imports: [
    ConfigModule, // Add ConfigModule
    MailerModule.forRootAsync({
      imports: [ConfigModule], // Add ConfigModule to imports
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: configService.get<string>('EMAIL_USER'), // Use ConfigService to get environment variable
            pass: configService.get<string>('EMAIL_PASSWORD'), // Use ConfigService to get environment variable
          },
        },
        defaults: {
          from: '"No Reply" <noreply@example.com>',
        },
        template: {
          dir: path.resolve(__dirname, '..', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
  ],
  exports: [MailerModule],
})
export class MailModule {}
