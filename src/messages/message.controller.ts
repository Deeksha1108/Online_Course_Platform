import { UpdateMessageDto } from './dto/update-message.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Messages')
@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  @ApiOperation({ summary: 'Send a message' })
  @ApiResponse({
    status: 201,
    description: 'The message has been successfully sent.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateMessageDto })
  sendMessage(@Body() dto: CreateMessageDto) {
    return this.messageService.sendMessage(dto);
  }

  @Get('chat/:userId1/:userId2')
  @ApiOperation({ summary: 'Get chat between two users' })
  @ApiResponse({ status: 200, description: 'Return the chat messages.' })
  @ApiParam({ name: 'userId1', description: 'First user ID', type: String })
  @ApiParam({ name: 'userId2', description: 'Second user ID', type: String })
  getChat(@Param('userId1') id1: string, @Param('userId2') id2: string) {
    return this.messageService.getChat(id1, id2);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all messages for a user' })
  @ApiResponse({ status: 200, description: 'Return all user messages.' })
  @ApiParam({ name: 'userId', description: 'User ID', type: String })
  getMessageByUser(@Param('userId') id: string) {
    return this.messageService.getMessageByUser(id);
  }

  @Put()
  @ApiOperation({ summary: 'Update a message' })
  @ApiResponse({
    status: 200,
    description: 'The message has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Message not found or unauthorized.',
  })
  @ApiBody({ type: UpdateMessageDto })
  UpdateMessageDto(@Body() dto: UpdateMessageDto) {
    return this.messageService.updateMessage(dto);
  }

  @Delete(':messageId')
  @ApiOperation({ summary: 'Delete a message' })
  @ApiResponse({
    status: 200,
    description: 'The message has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Message not found.' })
  @ApiParam({ name: 'messageId', description: 'Message ID', type: String })
  deleteMessage(@Param('messageId') id: string) {
    return this.messageService.deleteMessage(id);
  }
}
