import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Query,
  Post,
  NotFoundException,
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
  async getUserByEmailandPassword(
    @Query('email') email: string,
    @Query('password') password: string,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email, password },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  async createUser(@Body() user: Partial<User>): Promise<User> {
    if (!user || !user.name) {
      throw new BadRequestException(`A user must have a name and password`);
    }
    const createdUser = await this.userService.createUser(user);

    return createdUser;
  }

  @Post('reset-password')
  async requestPasswordReset(@Body() requestBody: { email: string }) {
    await this.userService.requestPasswordReset(requestBody.email);
    return { message: 'Password reset email sent' };
  }
}
