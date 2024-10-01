import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/token.guards';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@UseGuards(AccessTokenGuard)
@Controller('post/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/:postId')
  createComment(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() request,
  ) {
    const user = request?.decodedData;
    return this.commentService.createComment(postId, createCommentDto, user);
  }

  @Patch('like/:commentId')
  addLikeToComment(@Param('commentId') commentId: string, @Req() request) {
    const user = request?.decodedData;
    return this.commentService.addLikeToComment(commentId, user);
  }
  @Patch('unlike/:commentId')
  removeLikeToComment(@Param('commentId') commentId: string, @Req() request) {
    const user = request?.decodedData;
    return this.commentService.removeLikeToComment(commentId, user);
  }
}
