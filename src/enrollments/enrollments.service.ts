import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enrollment, EnrollmentDocument } from './enrollment.schema';
import { User, UserDocument, Role } from 'src/users/user.schema';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { WinstonLogger } from 'src/logger/logger.service';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Enrollment.name)
    private readonly enrollmentModel: Model<EnrollmentDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly logger: WinstonLogger,
  ) {}

  async enroll(userId: string, courseId: string): Promise<Enrollment> {
    this.logger.log(
      `Enrolling user ${userId} in course ${courseId}`,
      'EnrollmentsService',
    );
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('Not found');
    }

    if (user.role !== Role.Student) {
      throw new UnauthorizedException('Unauthorized!');
    }
    const existingUser = await this.enrollmentModel.findOne({
      user: userId,
      course: courseId,
    });
    if (existingUser) {
      throw new ConflictException('Already Enrolled!');
    }

    const enrollment = new this.enrollmentModel({
      user: userId,
      course: courseId,
    });
    return enrollment.save();
  }

  async unenroll(
    userId: string,
    courseId: string,
  ): Promise<{ message: string }> {
    const res = await this.enrollmentModel.findOneAndDelete({
      user: userId,
      course: courseId,
    });
    if (!res) {
      throw new ConflictException('Not Enrolled!');
    }
    return { message: 'Successfully Unenrolled' };
  }

  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentModel
      .find()
      .populate('user')
      .populate('course')
      .exec();
  }

  async findByUser(userId: string): Promise<Enrollment[]> {
    return this.enrollmentModel
      .find({ user: userId })
      .populate('course')
      .exec();
  }

  async findByCourse(courseId: string): Promise<Enrollment[]> {
    return this.enrollmentModel
      .find({ course: courseId })
      .populate('user')
      .exec();
  }
}
