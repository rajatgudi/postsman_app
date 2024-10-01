import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts } from 'src/posts/schemas/posts.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comments } from './schemas/comments.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comments.name) private readonly commentModel: Model<Comments>,
    @InjectModel(Posts.name) private readonly postModel: Model<Posts>,
  ) {}

  async createComment(
    postId: string,
    createCommentDto: CreateCommentDto,
    user: any,
  ) {
    if (!user) {
      throw new UnauthorizedException('Not authorized perform this action!');
    }
    if (!postId) {
      throw new BadRequestException('Invalid post operation!');
    }

    try {
      const newComment = await this.commentModel.create({
        createCommentDto,
        comment: createCommentDto.comment,
        postId,
        userId: user?.id,
      });
      console.log('newComment', newComment, {
        createCommentDto,
        postId,
        userId: user?.id,
      });
      const addCommentToPost = await this.postModel.findByIdAndUpdate(
        postId,
        {
          $addToSet: { comments: newComment.id },
        },
        { new: true },
      );
      if (!addCommentToPost) {
        throw new NotFoundException(`Post with id ${postId} not found! `);
      }
      return addCommentToPost;
    } catch (error) {
      throw error;
    }
  }

  async addLikeToComment(commentId: string, user: any) {
    if (!user) {
      throw new UnauthorizedException('Not authorized perform this action!');
    }
    try {
      const currentComment = await this.commentModel.findById(commentId);
      if (!currentComment) {
        throw new NotFoundException(`Comment with id ${commentId} not found! `);
      }
      const likedComment = await this.commentModel.findByIdAndUpdate(
        commentId,
        {
          $addToSet: {
            likes: user?.id,
          },
        },
        { new: true },
      );
      if (likedComment) {
        return { success: true, comment: likedComment };
      } else {
        throw new BadRequestException('error while liking comment');
      }
    } catch (error) {
      throw error;
    }
  }

  async removeLikeToComment(commentId: string, user: any) {
    if (!user) {
      throw new UnauthorizedException('Not authorized perform this action!');
    }
    try {
      const currentComment = await this.commentModel.findById(commentId);
      if (!currentComment) {
        throw new NotFoundException(`Comment with id ${commentId} not found! `);
      }
      const unlikedComment = await this.commentModel.findByIdAndUpdate(
        commentId,
        {
          $pull: {
            likes: user?.id,
          },
        },
        { new: true },
      );
      if (unlikedComment) {
        return { success: true, comment: unlikedComment };
      } else {
        throw new BadRequestException('error while liking comment');
      }
    } catch (error) {
      throw error;
    }
  }
}
