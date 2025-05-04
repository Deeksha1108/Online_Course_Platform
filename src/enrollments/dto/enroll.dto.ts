import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class EnrollDto {
  @ApiProperty({
    description: 'User Enrolled ID',
    example: '687f1f77bcf86cd79943901f',
  })
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Course Enrolled ID',
    example: '687f1f77bcf86cd799439012',
  })
  @IsMongoId()
  @IsNotEmpty()
  courseId: string;
}
