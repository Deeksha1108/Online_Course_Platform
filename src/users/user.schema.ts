import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

export enum Role {
  Student = 'student',
  Instructor = 'instructor',
}

@Schema()
export class User {
  @ApiProperty({
    description: 'Username',
    example: 'Deeksha',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'deeksha08@gmail.com',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'pass@123',
    writeOnly: true,
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    description: 'The role of the user',
    enum: Role,
    example: Role.Student,
  })
  @Prop({ required: true, enum: Role })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
