import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: MongoRepository<User>,
    private readonly userService: UsersService,
  ) {}

  @Post('reset-password')
  async requestPasswordReset(@Body() requestBody: { email: string }) {
    await this.userService.requestPasswordReset(requestBody.email);
    return { message: 'Password reset email sent' };
  }
}
