import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Users extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Email already exists!'] })
  email: string;

  @Prop({ unique: [true, 'Username already exists!'] })
  username: string;

  @Prop()
  password: string;

  @Prop()
  profileImage: string;

  @Prop([{ type: Types.ObjectId, ref: 'Posts' }])
  likedPosts: string[];

  @Prop([{ type: Types.ObjectId, ref: 'Posts' }])
  bookmarkedPosts: string[];
}

export const UserSchema = SchemaFactory.createForClass(Users);
