import { UpdateCourseDto } from './dto/update-course.dto';
import { EnrollmentsService } from './../enrollments/enrollments.service';
import { DeleteCourseDto } from './dto/delete-course.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';
import { UsersService } from 'src/users/users.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Role } from 'src/users/user.schema';
import { WinstonLogger } from 'src/logger/logger.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    private readonly usersService: UsersService,
    private readonly enrollmentsService: EnrollmentsService,
    private readonly logger: WinstonLogger,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    this.logger.log('Creating course', 'CoursesService');
    const instructor = await this.usersService.findById(
      createCourseDto.instructorId,
    );
    if (!instructor || instructor.role !== Role.Instructor) {
      throw new UnauthorizedException('Unauthorized!');
    }

    const course = new this.courseModel({
      ...createCourseDto,
      instructor: createCourseDto.instructorId,
    });
    return course.save();
  }

  async findOne(courseId: string) {
    const course = await this.courseModel
      .findById(courseId)
      .populate('instructor');

    if (!course) {
      throw new NotFoundException('Resource not found!');
    }
    return course;
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().populate('instructor').exec();
  }

  async update(updateCourseDto: UpdateCourseDto): Promise<Course> {
    const { courseId, title, description } = updateCourseDto;

    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Resource not found!');
    }
    if (title) {
      course.title = title;
    }
    if (description) {
      course.description = description;
    }
    return await course.save();
  }

  async delete(deleteCourseDto: DeleteCourseDto): Promise<{ message: string }> {
    const { courseId, instructorId } = deleteCourseDto;
    const existingCourse = await this.courseModel.findOne({
      _id: courseId,
      instructor: instructorId,
    });
    if (!existingCourse) {
      throw new NotFoundException('Resource not found!');
    }

    await this.courseModel.deleteOne({ _id: String(courseId) });
    return { message: 'Successfully deleted!' };
  }
}
