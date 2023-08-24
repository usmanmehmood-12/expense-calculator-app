import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
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

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  @Post()
  async createUser(@Body() user: Partial<User>): Promise<User> {
    if (!user || !user.name) {
      throw new BadRequestException(`A user must have a name and password`);
    }
    return await this.userService.createUser(user);
  }

  @Post('reset-password')
  async requestPasswordReset(@Body() requestBody: { email: string }) {
    await this.userService.requestPasswordReset(requestBody.email);
    return { message: 'Password reset email sent' };
  }
}
