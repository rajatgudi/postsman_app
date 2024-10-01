import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/token.guards';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@UseGuards(AccessTokenGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get('current')
  getCurrentUser(@Req() request) {
    const user = request?.decodedData;
    return this.usersService.getCurrentUser(user);
  }
  @Get('all')
  findAllUserDetails() {
    return this.usersService.findAllUsersDetails();
  }
  @UseGuards(AccessTokenGuard)
  @Get('likedPosts')
  findLikedPosts(@Req() request) {
    const user = request?.decodedData;
    return this.usersService.findLikedPostsbyUser(user);
  }
  @UseGuards(AccessTokenGuard)
  @Get('bookmarkedPosts')
  findBookmarkedPosts(@Req() request) {
    const user = request?.decodedData;
    return this.usersService.findBookmarkedPostsbyUser(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request,
  ) {
    const user = request?.decodedData;
    return this.usersService.update(id, updateUserDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
