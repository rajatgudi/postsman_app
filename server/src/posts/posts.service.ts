import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/users/schemas/users.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './schemas/posts.schema';

@Injectable()
export class PostsService {
  /**
   * Constructs an instance of the `PostsService` and injects the Mongoose model for `Posts`.
   *
   * @param postModel - The Mongoose model for the `Posts` schema.
   */
  constructor(
    @InjectModel(Posts.name) private readonly postModel: Model<Posts>,

    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) {}

  /**
     * Creates a new post based on the provided DTO.
     *
     * @param createPostDto - The data transfer object containing the details of the post to be created.
     * @returns The newly created post document.
     
     */
  async create(createPostDto: CreatePostDto, user: any) {
    if (!user) {
      throw new UnauthorizedException('Not authorized perform this action!');
    }
    const { caption, image, title } = createPostDto;
    try {
      const newPost = await this.postModel.create({
        title,
        caption,
        image,
        userId: user?.id,
      });
      console.log('newPost', newPost);
      return newPost;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Retrieves all posts from the database.
   * when userId provided fetch all posts from userId
   *
   * @returns An array of posts documents.
   */
  async findAll(userId?: string) {
    if (userId) {
      const posts = await this.postModel.find({ userId }).exec();
      if (!posts) {
        throw new NotFoundException(`posts for user ${userId} not found!`);
      }
      return posts;
    }
    return await this.postModel.find();
  }

  /**
   * Retrieves a single post by its ID.
   *
   * @param id - The ID of the post to retrieve.
   * @returns The post document if found.
   * @throws NotFoundException if the post with the given ID is not found.
   */
  async findOne(id: string) {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found!`);
    }
    return post;
  }
  /**
   * Updates an existing post based on the provided DTO.
   *
   * @param id - The ID of the post to update.
   * @param updatePostDto - The data transfer object containing the updated details of the post.
   * @returns The updated post document.
   * @throws NotFoundException if the post with the given ID is not found.
   */

  async update(id: string, updatePostDto: UpdatePostDto, user: any) {
    if (!user) {
      throw new UnauthorizedException('Not authorized perform this action!');
    }
    const post = await this.postModel.findByIdAndUpdate(
      {
        _id: id,
      },
      { ...updatePostDto, userId: user.userId },
      { new: true },
    );
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found!`);
    }
    return post;
  }
  /**
   * Deletes a post by its ID.
   *
   * @param id - The ID of the post to delete.
   * @returns The deleted post document if found.
   * @throws ConflictException if the post with the given ID is not found.
   */
  async remove(id: string, user: any) {
    if (!user) {
      throw new UnauthorizedException('Not authorized perform this action!');
    }
    const post = await this.postModel.findByIdAndDelete({ _id: id });
    if (post) {
      return post;
    } else {
      throw new ConflictException(`Post with id ${id} not found!`);
    }
  }

  async addLikeToPost(postId: string, user: any) {
    if (!user) {
      throw new UnauthorizedException('Not authorized perform this action!');
    }
    try {
      const likedPost = await this.postModel.findByIdAndUpdate(
        postId,
        {
          $addToSet: {
            likes: user?.id,
          },
        },
        { new: true },
      );
      await this.userModel.findByIdAndUpdate(
        user?.id,
        {
          $addToSet: {
            likedPosts: postId,
          },
        },
        { new: true },
      );
      if (!likedPost) {
        throw new BadRequestException('error while liking post');
      }
      return likedPost;
    } catch (error) {
      throw error;
    }
  }
  async removeLikeToPost(postId: string, user: any) {
    if (!user) {
      throw new UnauthorizedException('Not authorized perform this action!');
    }
    try {
      const unlikedPost = await this.postModel.findByIdAndUpdate(
        postId,
        {
          $pull: {
            likes: user?.id,
          },
        },
        { new: true },
      );
      await this.userModel.findByIdAndUpdate(
        user?.id,
        {
          $pull: {
            likedPosts: postId,
          },
        },
        { new: true },
      );
      if (!unlikedPost) {
        throw new BadRequestException('error while liking post');
      }
      return unlikedPost;
    } catch (error) {
      throw error;
    }
  }
  async addBookmarkPost(postId: string, user: any) {
    if (!user) {
      throw new UnauthorizedException('Not authorized perform this action!');
    }
    try {
      const newBookmark = await this.postModel.findByIdAndUpdate(
        postId,
        {
          $addToSet: {
            bookmarks: user?.id,
          },
        },
        { new: true },
      );
      const userBookmark = await this.userModel.findByIdAndUpdate(
        user?.id,
        {
          $addToSet: {
            bookmarkedPosts: postId,
          },
        },
        { new: true },
      );
      if (!newBookmark || !userBookmark) {
        throw new BadRequestException('error while bookmarking post');
      }
      return newBookmark;
    } catch (error) {
      throw error;
    }
  }
  async removeBookmarkPost(postId: string, user: any) {
    if (!user) {
      throw new UnauthorizedException('Not authorized perform this action!');
    }
    try {
      const removedBookmark = await this.postModel.findByIdAndUpdate(
        postId,
        {
          $pull: {
            bookmarks: user?.id,
          },
        },
        { new: true },
      );
      const removeduserBookmark = await this.userModel.findByIdAndUpdate(
        user?.id,
        {
          $pull: {
            bookmarkedPosts: postId,
          },
        },
        { new: true },
      );
      if (!removedBookmark || !removeduserBookmark) {
        throw new BadRequestException('error while removing bookmark post');
      }
      return removedBookmark;
    } catch (error) {
      throw error;
    }
  }
  async fetchAllPostsDetails() {
    try {
      const result = await this.postModel
        .find()
        .populate({
          path: 'userId',
          model: 'Users',
          select: '_id name username profileImage',
        })
        .populate({
          path: 'comments',
          model: 'Comments',
          select: '_id comment createdAt likes',
          populate: { path: 'likes', model: 'Users' },
        })
        .populate({
          path: 'likes',
          model: 'Users',
          select: '_id name username profileImage',
        })
        .populate({
          path: 'bookmarks',
          model: 'Users',
          select: '_id name username profileImage',
        })
        .exec();
      console.log('result', result);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
