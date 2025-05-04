import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { User } from 'src/users/user.schema';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @ApiProperty({
    description: 'The sender of the message',
    type: User,
  })
  @Prop({ type: Types.ObjectId, ref: 'User' })
  sender: User;

  @ApiProperty({
    description: 'The receiver of the message',
    type: User,
  })
  @Prop({ type: Types.ObjectId, ref: 'User' })
  receiver: User;

  @ApiProperty({
    description: 'The content of the message',
    example: 'Hello, how are you?',
  })
  @Prop()
  content: string;

  @ApiProperty({
    description: 'Whether the message has been edited',
    example: false,
  })
  @Prop({ default: false })
  edited: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
