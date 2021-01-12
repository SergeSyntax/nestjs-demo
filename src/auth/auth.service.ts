import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredetialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredetialsDto: AuthCredetialsDto): Promise<void> {
    return this.userRepository.signUp(authCredetialsDto);
  }

  async signIn(
    authCredetialsDto: AuthCredetialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validationUserPassword(
      authCredetialsDto,
    );

    if (!username) throw new UnauthorizedException('Invalid credentials');

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
