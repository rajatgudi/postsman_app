import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Posts extends Document {
  @Prop()
  title: string;

  @Prop()
  caption: string;

  @Prop()
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'Users' })
  userId: { type: Types.ObjectId; ref: 'Users' };

  @Prop([{ type: Types.ObjectId, ref: 'Users' }])
  likes: string[];

  @Prop([{ type: Types.ObjectId, ref: 'Users' }])
  bookmarks: string[];

  @Prop([{ type: Types.ObjectId, ref: 'Comments' }])
  comments: string[];
}
export const PostSchema = SchemaFactory.createForClass(Posts);
