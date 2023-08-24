import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { ExpensesService } from './expenses/expenses.service';
import { ExpensesController } from './expenses/expenses.controller';
import { ExpensesModule } from './expenses/expenses.module';
import { Expense } from './expenses/expenses.entity';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_CONNECTION_STRING,
      database: process.env.MONGODB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    TypeOrmModule.forFeature([User, Expense]),
    ExpensesModule,
    UsersModule,
    MailModule,
  ],
  controllers: [AppController, UsersController, ExpensesController],
  providers: [AppService, ExpensesService, UsersService, MailService],
})
export class AppModule {}
