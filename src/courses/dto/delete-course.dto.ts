import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class DeleteCourseDto {
  @ApiProperty({
    description: 'The ID of the course to delete',
    example: '687f1f77bcf86cd799439053',
  })
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @ApiProperty({
    description: 'The ID of the instructor deleting the course',
    example: '687f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @IsNotEmpty()
  instructorId: string;
}
