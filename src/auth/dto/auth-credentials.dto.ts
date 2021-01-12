import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredetialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  /**
   * - Passwords will contain at least 1 upper case letter
   * - Passwords will contain at least 1 lower case letter
   * - Passwords will contain at least 1 number or special character
   * - There is no length validation (min, max) in this regex!
   */
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password to week',
  })
  password: string;
}
