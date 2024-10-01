import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/users.schema';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { PostsService } from 'src/posts/posts.service';
import { PostSchema } from 'src/posts/schemas/posts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UserSchema },
      { name: 'Posts', schema: PostSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService, PostsService],
  exports: [MongooseModule],
})
export class UsersModule {}
