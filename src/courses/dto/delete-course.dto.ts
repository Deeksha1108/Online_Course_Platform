import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class DeleteCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsMongoId()
  @IsNotEmpty()
  instructorId: string;
}