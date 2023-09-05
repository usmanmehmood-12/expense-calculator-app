import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { MongoRepository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly usersRepository: MongoRepository<User>,
    private readonly userService: UsersService,
  ) {}

  @Post('register')
  async createUser(@Body() user: Partial<User>) {
    if (!user || !user.name) {
      throw new BadRequestException(`A user must have a name and password`);
    }
    const createdUser = await this.userService.createUser(user);

    return createdUser;
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    console.log({ password, email });
    const user = await this.authService.validateUser(email, password);

    const token = await this.authService.login(user);
    console.log('line 53 | auth.controller | token: ', token);
    return { token };
  }
}
