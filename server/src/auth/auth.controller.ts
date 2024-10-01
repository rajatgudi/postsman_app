import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto, SignUpUserDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * Registers a new user.
   *  @param signUpDto - The data transfer object containing user registration details.
   * @returns A promise that resolves to the newly registered user.
   *
   * @remarks
   * This endpoint is used to register a new user. The user details must be provided in the `signUpDto`.
   * If the email already exists, a `400` status is returned with the error details.
   *
   */
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.signUp(signUpUserDto);
  }

  /**
   * Logs in an existing user.
   *
   *  @param loginDto - The data transfer object containing login credentials.
   *  @returns A promise that resolves to the login response, including tokens.
   *
   *  @remarks
   * This endpoint is used to authenticate an existing user. The credentials must be provided in the `loginDto`.
   * If the credentials are invalid, a `401` status is returned with the error details.
   */
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }
}
