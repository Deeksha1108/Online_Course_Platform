import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollDto } from './dto/enroll.dto';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post('enroll')
  enroll(@Body() enrollDto: EnrollDto) {
    return this.enrollmentsService.enroll(enrollDto.userId, enrollDto.courseId);
  }

  @Post('unenroll')
  unenroll(@Body() enrollDto: EnrollDto) {
    return this.enrollmentsService.unenroll(
      enrollDto.userId,
      enrollDto.courseId,
    );
  }

  @Get()
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.enrollmentsService.findByUser(userId);
  }

  @Get('course/:courseId')
  findByCourse(@Param('courseId') courseId: string) {
    return this.enrollmentsService.findByCourse(courseId);
  }
}
