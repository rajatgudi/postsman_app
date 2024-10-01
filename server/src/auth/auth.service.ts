import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto, SignUpUserDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from '../users/schemas/users.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;
  private readonly jwtExpire: string;
  private readonly jwtRefreshSecret: string;
  private readonly jwtRefreshExpire: string;
  /*
   * Constructs an instance of `AuthService` and initializes JWT secrets and expiration times.
   * @param userModel - Injected Mongoose model for `User` schema.
   * @param jwtService - Injected service for handling JWT tokens.
   * @param configService - Injected service for accessing environment variables.
   */
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
    this.jwtExpire = this.configService.get<string>('JWT_EXPIRE');
    this.jwtRefreshSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET');
    this.jwtRefreshExpire =
      this.configService.get<string>('JWT_REFRESH_EXPIRE');
  }

  /**
   * Registers a new user.
   *
   * @param signUpUserDto - The data transfer object containing user registration details.
   * @returns A promise that resolves to the newly created user.
   * @throws NotFoundException if the specified role does not exist.
   * @throws BadRequestException if the email already exists.
   */
  async signUp(signUpUserDto: SignUpUserDto) {
    const { email, name, password, username } = signUpUserDto;
    try {
      const currentuser = await this.userModel.findOne({ email });
      console.log('currentuser', currentuser);
      if (currentuser) throw new BadRequestException('Email already exists');

      const usernameUser = await this.userModel.findOne({ username });
      if (usernameUser)
        throw new BadRequestException('Username already exists');

      const hashedPassword = await this.hashData(password);
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        username,
      });

      const tokens = await this.getTokens({ id: user._id, email });
      return { user: { id: user._id, email: user.email }, ...tokens };
    } catch {
      throw new BadRequestException('Something went wrong!');
    }
  }
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) throw new UnauthorizedException('Invalid email or password');
      const passwordMatched = await bcrypt.compare(password, user.password);
      if (!passwordMatched)
        throw new UnauthorizedException('Invalid email or password');

      const tokens = await this.getTokens({ id: user._id, email });
      return { user: { id: user._id, email: user.email }, ...tokens };
    } catch (error) {
      throw error;
    }
  }
  /**
   * Generates a pair of access and refresh tokens.
   *
   * @param payload - The payload to include in the JWT tokens.
   * @returns A promise that resolves to an object containing the access and refresh tokens.
   */
  async getTokens(payload: any): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.jwtSecret,
        expiresIn: this.jwtExpire,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.jwtRefreshSecret,
        expiresIn: this.jwtRefreshExpire,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  /**
   * Hashes the provided data using bcrypt.
   *
   * @param data - The data to hash.
   * @returns A promise that resolves to the hashed data.
   */
  async hashData(data: string) {
    return await bcrypt.hash(data, 10);
  }
  /**
   * Verifies a JWT token.
   *
   * @param token - The JWT token to verify.
   * @returns A promise that resolves to the decoded token if verification is successful.
   * @throws UnauthorizedException if the token is invalid or expired.
   */
  async verifyToken(token: string) {
    console.log('Verify token was called with:', token);
    try {
      const decodedToken = await this.jwtService.verify(token, {
        secret: this.jwtSecret,
      });
      return decodedToken;
    } catch (error) {
      console.log(error.message);
      if (error.message === 'jwt expired') {
        throw new UnauthorizedException('jwt expired');
      } else {
        throw new UnauthorizedException('invalid token');
      }
    }
  }
}
