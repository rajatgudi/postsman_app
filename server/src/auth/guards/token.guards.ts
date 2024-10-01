import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

/**
 * Guard that implements JWT access token authentication strategy.
 * @remarks
 * The `AccessTokenGuard` is a custom guard that extends the `AuthGuard` class provided by Passport.js.
 * It is configured to use the `jwt` strategy, which validates the JWT access token included in the `Authorization` header.
 */
@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  /**
   * Constructs an instance of `AccessTokenGuard` with the necessary dependencies.
   *
   * @param reflector - The `Reflector` service is used to access custom metadata attached to routes.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;
      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedException('Please provide token');
      }
      const authToken = authorization.replace(/bearer/gim, '').trim();
      console.log('authToken', authToken);
      const resp = await this.authService.verifyToken(authToken);
      request.decodedData = resp;
      return true;
    } catch (error) {
      throw new ForbiddenException(
        error?.message || 'Session expired! Please sign In',
      );
    }
  }
  //   constructor(private reflector: Reflector) {
  //     super();
  //   }
  //   handleRequest(err: any, user: any, info: any) {
  //     if (err || !user) {
  //       if (info && info.name === 'TokenExpiredError') {
  //         throw new UnauthorizedException('jwt expired');
  //       } else if (info && info.name === 'JsonWebTokenError') {
  //         throw new UnauthorizedException('invalid token');
  //       } else {
  //         throw err || new UnauthorizedException('unauthorized');
  //       }
  //     }
  //     return user;
  //   }
}
