import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCourseDto {
  @ApiProperty({
    description: 'The ID of the course to update',
    example: '687f1f77bcf86cd799439012',
  })
  @IsMongoId()
  @IsNotEmpty()
  courseId: string;

  @ApiProperty({
    description: 'The new title for the course',
    example: 'Advanced NestJS Concepts',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The new description for the course',
    example: 'Learn advanced concepts of NestJS framework',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
