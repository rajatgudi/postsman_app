import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './schemas/users.schema';
import { Response } from 'src/types';
import { Posts } from 'src/posts/schemas/posts.schema';

/**
 * Service that handles users - related operations
 * @remarks
 * The `UsersService` class provides methods for signup, finding, updating, and deleting users within the application.
 *  It interacts with the MongoDB database through the Mongoose model and handles any necessary validation or error handling.
 */
@Injectable()
export class UsersService {
  /**
   * Constructs an instance of the `UsersService` and injects the Mongoose model for `Users`.
   *
   * @param userModel - The Mongoose model for the `Users` schema.
   */
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
    @InjectModel(Posts.name) private readonly postModel: Model<Posts>,
  ) {}

  /**
   * Retrieves all users from the database.
   *
   * @returns An array of user documents.
   */
  async findAll() {
    return await this.userModel.find();
  }

  /**
   * Retrieves a single user by its ID.
   *
   * @param id - The ID of the user to retrieve.
   * @returns The user document if found.
   * @throws NotFoundException if the user with the given ID is not found.
   */
  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found!`);
    }
    return user;
  }
  /**
   * Updates an existing user based on the provided DTO.
   *
   * @param id - The ID of the user to update.
   * @param updateUserDto - The data transfer object containing the updated details of the user.
   * @returns The updated user document.
   * @throws NotFoundException if the user with the given ID is not found.
   */
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    user: any,
  ): Promise<Response> {
    try {
      if (!user) {
        throw new UnauthorizedException('Not authorized perform this action!');
      }
      const updatedUser = await this.userModel.findByIdAndUpdate(
        { _id: id },
        { ...updateUserDto, userId: user.userId },
        { new: true },
      );
      if (!updatedUser) {
        return {
          message: `User with id ${id} not found`,
          status: HttpStatus.NOT_FOUND,
          error: `User with id ${id} not found`,
          success: false,
        };
      }
      return {
        message: `updated user ${id} succesfully!`,
        result: updatedUser,
        status: HttpStatus.OK,
        success: true,
      };
    } catch (error) {
      return {
        message: `Something went wrong!`,
        status: HttpStatus.BAD_REQUEST,
        error: error?.message,
        success: false,
      };
    }
  }

  async findAllUsersDetails() {
    try {
      const result = await this.userModel
        .find()
        .populate({
          path: 'bookmarkedPosts',
          model: 'Posts',
          select: '_id title caption image likes',
          populate: {
            path: 'comments',
            model: 'Comments',
            select: '_id comment createdAt likes comments',
            populate: {
              path: 'likes',
              model: 'Users',
              select: '_id name username profileImage',
            },
          },
        })
        .populate({
          path: 'likedPosts',
          model: 'Posts',
          select: '_id title caption image likes comments',
          populate: {
            path: 'likes',
            model: 'Users',
            select: '_id name username profileImage',
          },
        })
        .exec();
      return result;
    } catch (error) {
      throw error;
    }
  }
  async findLikedPostsbyUser(user: any) {
    const result = await this.userModel
      .find({ _id: user?.id })
      .populate({
        path: 'likedPosts',
        model: 'Posts',
        select: '_id title caption image userId',
        populate: {
          path: 'userId',
          model: 'Users',
          select: '_id name profileImage username',
        },
      })
      .select('_id name profileImage username');
    console.log('result', result);
    return result;
  }
  async findBookmarkedPostsbyUser(user: any) {
    const result = await this.userModel
      .find({ _id: user?.id })
      .populate({
        path: 'bookmarkedPosts',
        model: 'Posts',
        select: '_id title caption image userId',
        populate: {
          path: 'userId',
          model: 'Users',
          select: '_id name profileImage username',
        },
      })
      .select('_id name profileImage username');
    console.log('result', result);
    return result;
  }
  async remove(id: string): Promise<Response> {
    const user = await this.userModel.findByIdAndDelete({ _id: id });
    try {
      if (user) {
        return {
          message: `Removed user ${id} succesfully!`,
          result: user,
          status: HttpStatus.OK,
          success: true,
        };
      } else {
        // throw new NotFoundException(`User with id ${id} not found!`);
        return {
          message: `User with id ${id} not found`,
          status: HttpStatus.NOT_FOUND,
          error: `User with id ${id} not found`,
          success: false,
        };
      }
    } catch (error) {
      return {
        message: `Something went wrong!`,
        status: HttpStatus.BAD_REQUEST,
        error: error?.message,
        success: false,
      };
    }
  }
  async getCurrentUser(user: any) {
    //not displaying password field
    const users = await this.userModel.findById(user?.id, {
      password: 0,
      likedPosts: 0,
      bookmarkedPosts: 0,
    });
    if (!user) {
      throw new NotFoundException(`User with id ${user?.id} not found!`);
    }
    return users;
  }
}
