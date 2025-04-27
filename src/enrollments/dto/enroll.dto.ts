import { IsMongoId, IsNotEmpty } from 'class-validator';

export class EnrollDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsMongoId()
  @IsNotEmpty()
  courseId: string;
}