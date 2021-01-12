import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthCredetialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredetialsDto: AuthCredetialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredetialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredetialsDto: AuthCredetialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredetialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }
}
