import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schemas/users.schema';
import { PostSchema } from 'src/posts/schemas/posts.schema';
import { CommentSchema } from './schemas/comments.schema';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { PostsService } from 'src/posts/posts.service';
import { PostsController } from 'src/posts/posts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UserSchema },
      { name: 'Posts', schema: PostSchema },
      { name: 'Comments', schema: CommentSchema },
    ]),
  ],
  controllers: [CommentController, PostsController],
  providers: [CommentService, AuthService, JwtService, PostsService],
  exports: [MongooseModule],
})
export class CommentModule {}
