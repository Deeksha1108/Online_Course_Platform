import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { WinstonLogger } from 'src/logger/logger.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly logger: WinstonLogger,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log('Creating new user', 'UsersService');
    try {
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred';
      this.logger.error(
        `User creation failed: ${errorMessage}`,
        'UsersService',
      );
      throw err;
    }
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, {
        new: true,
      })
      .exec();
    if (!user) throw new NotFoundException('Not Found!');
    return user;
  }

  async delete(_id: string): Promise<{ message: string }> {
    const result = await this.userModel.deleteOne({ _id });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Not Found!');
    }
    return { message: 'Successfully Deleted!' };
  }
}
