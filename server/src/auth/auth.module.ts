import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from 'src/auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/schemas/users.schema';
import { PostSchema } from '../posts/schemas/posts.schema';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    /**
     * Registers MongoDB schemas for the `User` collections.
     *
     * @remarks
     * This allows the `UserSchema` to be used in the application, enabling
     * the `AuthService` to interact with MongoDB for user  management.
     *
     * @see {@link UserSchema}
     * @see {@link RoleSchema}
     */
    MongooseModule.forFeature([
      { name: 'Users', schema: UserSchema },
      { name: 'Posts', schema: PostSchema },
    ]),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [MongooseModule, AuthService],
})
export class AuthModule {}
