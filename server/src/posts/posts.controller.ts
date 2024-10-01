import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/token.guards';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() request) {
    const user = request?.decodedData;
    return this.postsService.create(createPostDto, user);
  }
  @Get()
  fetchAllPostDetails() {
    return this.postsService.fetchAllPostsDetails();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  // @Get()
  // findAll(@Req() request) {
  //   const { userId } = request?.query;
  //   return this.postsService.findAll(userId);
  // }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() request,
  ) {
    const user = request?.decodedData;
    return this.postsService.update(id, updatePostDto, user);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request) {
    const user = request?.decodedData;
    return this.postsService.remove(id, user);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('like/:postId')
  likeToPost(@Param('postId') postId: string, @Req() request) {
    const user = request?.decodedData;
    return this.postsService.addLikeToPost(postId, user);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('unlike/:postId')
  unlikeToPost(@Param('postId') postId: string, @Req() request) {
    const user = request?.decodedData;
    return this.postsService.removeLikeToPost(postId, user);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('addbookmark/:postId')
  addBookmarkPost(@Param('postId') postId: string, @Req() request) {
    const user = request?.decodedData;
    return this.postsService.addBookmarkPost(postId, user);
  }
  @UseGuards(AccessTokenGuard)
  @Patch('removebookmark/:postId')
  removeBookmarkPost(@Param('postId') postId: string, @Req() request) {
    const user = request?.decodedData;
    return this.postsService.removeBookmarkPost(postId, user);
  }
}
