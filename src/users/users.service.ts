import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { generateTemporaryPassword } from 'src/utils/utils';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
    private readonly mailService: MailService,
  ) {}

  async createUser(user: any) {
    return await this.userRepository.save(new User(user));
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
}
