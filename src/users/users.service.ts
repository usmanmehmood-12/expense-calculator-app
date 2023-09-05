import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from './users.entity';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { generateTemporaryPassword } from 'src/utils/utils';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(user: any) {
    const existingUser = await this.findByEmail(user.email);
    console.log('line 23 | users.service.ts | existingUser: ', existingUser);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password with a salt
    user.password = hashedPassword;

    const newUser = await this.userRepository.save(new User(user));
    const { ...userWithoutPassword } = newUser;
    const token = this.jwtService.sign({
      sub: newUser.id,
      email: newUser.email,
    });

    return { user: userWithoutPassword, access_token: token };
  }

  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email: email } });

    if (!user) {
      return;
    }

    // Generate a temporary password
    const temporaryPassword = generateTemporaryPassword();
    user.password = temporaryPassword;
    await this.userRepository.save(user);

    // Send password reset email with the temporary password
    this.mailService.sendPasswordResetEmail(user.email, temporaryPassword);
  }

  async findByEmail(email) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    return user;
  }

  async findByUserId(id) {
    const user = await this.userRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    return user;
  }
}
