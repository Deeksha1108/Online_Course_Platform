import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enrollment, EnrollmentDocument } from './enrollment.schema';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Enrollment.name)
    private enrollmentModel: Model<EnrollmentDocument>,
  ) {}

  async enroll(userId: string, courseId: string): Promise<Enrollment> {
    const existing = await this.enrollmentModel.findOne({
      user: userId,
      course: courseId,
    });
    if (existing) {
      throw new ConflictException('User already enrolled');
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
      throw new ConflictException('User not enrolled');
    }
    return { message: 'User successfully unenrolled' };
  }

  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentModel.find().populate('user').populate('course').exec();
  }

  async findByUser(userId: string): Promise<Enrollment[]> {
    return this.enrollmentModel.find({ user: userId }).populate('course').exec();
  }

  async findByCourse(courseId: string): Promise<Enrollment[]> {
    return this.enrollmentModel.find({ course: courseId }).populate('user').exec();
  }

  async deleteAllEnrollmentByCourse(courseId: string): Promise<void> {
    await this.enrollmentModel.deleteMany({ course: courseId });
  }
}
