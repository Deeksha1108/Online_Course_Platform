import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    description: 'The title of the course',
    example: 'Introduction to NestJS',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the course',
    example: 'Learn the fundamentals of NestJS framework',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Instructor id that create the course',
    example: '687f1f77bcf86cd79943901f',
  })
  @IsString()
  @IsNotEmpty()
  instructorId: string;
}
