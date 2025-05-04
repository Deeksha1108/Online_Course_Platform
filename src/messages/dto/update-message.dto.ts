import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateMessageDto {
  @ApiProperty({
    description: 'The ID of the message to update',
    example: '687f1f77bcf86cd799439015',
  })
  @IsMongoId()
  @IsNotEmpty()
  messageId: string;

  @ApiProperty({
    description: 'The ID of the message sender (for verification)',
    example: '687f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @IsNotEmpty()
  senderId: string;

  @ApiProperty({
    description: 'The new content of the message',
    example: 'Updated message content',
  })
  @IsString()
  @IsNotEmpty()
  newContent: string;
}
