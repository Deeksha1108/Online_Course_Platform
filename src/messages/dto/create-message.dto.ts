import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: 'The ID of the message sender',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @IsNotEmpty()
  senderId: string;

  @ApiProperty({
    description: 'The ID of the message receiver',
    example: '507f1f77bcf86cd799439012',
  })
  @IsMongoId()
  @IsNotEmpty()
  receiverId: string;

  @ApiProperty({
    description: 'The content of the message',
    example: 'Hey, how are you?',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
