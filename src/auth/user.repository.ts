import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredetialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredetialsDto: AuthCredetialsDto): Promise<void> {
    const { username, password } = authCredetialsDto;

    const salt = await bcrypt.genSalt();
    const user = new User();
    user.username = username;
    user.password = await this.hashPassword(password, salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505')
        // duplicate username
        throw new ConflictException('Username already exists');
      else throw new InternalServerErrorException();
    }
  }

  async validationUserPassword(authCredetialsDto: AuthCredetialsDto) {
    const { username, password } = authCredetialsDto;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) return user.username;
    else return null;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
