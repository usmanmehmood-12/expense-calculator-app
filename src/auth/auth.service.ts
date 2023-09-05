import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: any): Promise<{ access_token: string }> {
    try {
      const payload = { sub: user.id, email: user.email };
      const access_token = this.jwtService.sign(payload);

      return {
        access_token,
      };
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Wrong email or password, please reenter',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async validateUserById(userId: number) {
    const user = await this.userService.findByUserId(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // If the user is found, return their data
    return user;
  }
}
