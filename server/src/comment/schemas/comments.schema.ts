import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Comments extends Document {
  @Prop()
  comment: string;

  @Prop([{ type: Types.ObjectId, ref: 'Users' }])
  userId: string;

  @Prop([{ type: Types.ObjectId, ref: 'Posts' }])
  postId: string;

  @Prop([{ type: Types.ObjectId, ref: 'Users' }])
  likes: string[];
}
export const CommentSchema = SchemaFactory.createForClass(Comments);
