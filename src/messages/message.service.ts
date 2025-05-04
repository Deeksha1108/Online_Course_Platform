import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Message, MessageDocument } from './message.schema';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { WinstonLogger } from 'src/logger/logger.service';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    private readonly logger: WinstonLogger,
  ) {}

  async sendMessage(dto: CreateMessageDto) {
    this.logger.log(
      `Sending message from ${dto.senderId} to ${dto.receiverId}`,
      'MessageService',
    );
    if (dto.senderId === dto.receiverId) {
      throw new ForbiddenException('Cannot send message');
    }
    const msg = new this.messageModel({
      sender: dto.senderId,
      receiver: dto.receiverId,
      content: dto.content,
    });
    return msg.save();
  }

  async getChat(userId1: string, userId2: string) {
    return this.messageModel
      .find({
        $or: [
          { sender: userId1, receiver: userId2 },
          { sender: userId2, receiver: userId1 },
        ],
      })
      .exec();
  }

  async getMessageByUser(userId: string) {
    return this.messageModel
      .find({
        $or: [{ sender: userId }, { receiver: userId }],
      })
      .exec();
  }

  async deleteMessage(messageId: string): Promise<{ message: string }> {
    const res = await this.messageModel.findByIdAndDelete(messageId);
    if (!res) {
      throw new NotFoundException('Not Found!');
    }
    return { message: 'Deleted successfully!' };
  }

  async updateMessage(dto: UpdateMessageDto): Promise<Message> {
    this.logger.log(`Updating message ${dto.messageId}`, 'MessageService');
    const message = await this.messageModel.findOne({
      _id: dto.messageId,
      sender: dto.senderId,
    });
    if (!message) {
      throw new NotFoundException('Not Found!');
    }
    message.content = dto.newContent;
    message.edited = true;
    return message.save();
  }
}
