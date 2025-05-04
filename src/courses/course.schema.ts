import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/user.schema';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @ApiProperty({
    description: 'The title of the course',
    example: 'Introduction to NodeJS',
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    description: 'The description of the course',
    example: 'Learn the fundamentals of NodeJS framework',
    required: false,
  })
  @Prop()
  description: string;

  @ApiProperty({
    description: 'The instructor of the course',
    type: User,
  })
  @Prop({ type: Types.ObjectId, ref: 'User' })
  instructor: User;

  @ApiProperty({
    description: 'Course creation date',
    example: '2023-05-01T00:00:00.000Z',
  })
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
