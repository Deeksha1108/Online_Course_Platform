import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { Course } from 'src/courses/course.schema';
import { User } from 'src/users/user.schema';

export type EnrollmentDocument = Enrollment & Document;

@Schema()
export class Enrollment {
  @ApiProperty({
    description: 'The enrolled user',
    type: User,
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @ApiProperty({
    description: 'The course the user is enrolled in',
    type: Course,
  })
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course: Course;

  @ApiProperty({
    description: 'The date when the user enrolled',
    example: '2023-05-01T00:00:00.000Z',
  })
  @Prop({ default: Date.now })
  enrolledAt: Date;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
