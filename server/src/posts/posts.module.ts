import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/posts.schema';
import { AuthService } from 'src/auth/auth.service';
import { UserSchema } from 'src/users/schemas/users.schema';
import { JwtService } from '@nestjs/jwt';
import { CommentSchema } from 'src/comment/schemas/comments.schema';
import { CommentController } from 'src/comment/comment.controller';
import { CommentService } from 'src/comment/comment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UserSchema },
      { name: 'Posts', schema: PostSchema },
      { name: 'Comments', schema: CommentSchema },
    ]),
  ],
  controllers: [PostsController, CommentController],
  providers: [PostsService, AuthService, JwtService, CommentService],
  exports: [MongooseModule],
})
export class PostsModule {}
