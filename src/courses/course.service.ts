import { UpdateCourseDto } from './dto/update-course.dto';
import { EnrollmentsService } from './../enrollments/enrollments.service';
import { DeleteCourseDto } from './dto/delete-course.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';
import { UsersService } from 'src/users/users.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Role } from 'src/users/user.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument, any>,
    private usersService: UsersService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const instructor = await this.usersService.findById(
      createCourseDto.instructorId,
    );
    if (!instructor || instructor.role !== Role.INSTRUCTOR) {
      throw new BadRequestException('Invalid instructor');
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
      throw new NotFoundException('Course not found!');
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
      throw new NotFoundException('Course not found');
    }
    if (title) {
      course.title = title;
    }
    if (description) {
      course.description = description;
    }
    return course.save();
  }

  async delete(deleteCourseDto: DeleteCourseDto) {
    const { title, instructorId } = deleteCourseDto;
    const existingCourse = await this.courseModel.findOne({
      title,
      instructor: instructorId,
    });
    if (!existingCourse) {
      throw new NotFoundException('Course not found!');
    }

    await this.enrollmentsService.deleteAllEnrollmentByCourse(
      existingCourse._id.toString(),
    );

    await this.courseModel.deleteOne({ _id: existingCourse._id.toString() });
    return {
      message: 'Course deleted successfully',
    };
  }
}
