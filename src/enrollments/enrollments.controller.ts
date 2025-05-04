import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollDto } from './dto/enroll.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Enrollments')
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post('enroll')
  @ApiOperation({ summary: 'Enroll a student in a course' })
  @ApiResponse({
    status: 201,
    description: 'The student has been successfully enrolled.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 409, description: 'Already enrolled.' })
  @ApiBody({ type: EnrollDto })
  enroll(@Body() enrollDto: EnrollDto) {
    return this.enrollmentsService.enroll(enrollDto.userId, enrollDto.courseId);
  }

  @Post('unenroll')
  @ApiOperation({ summary: 'Unenroll a student from a course' })
  @ApiResponse({
    status: 200,
    description: 'The student has been successfully unenrolled.',
  })
  @ApiResponse({ status: 409, description: 'Not enrolled.' })
  @ApiBody({ type: EnrollDto })
  unenroll(@Body() enrollDto: EnrollDto) {
    return this.enrollmentsService.unenroll(
      enrollDto.userId,
      enrollDto.courseId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all enrollments' })
  @ApiResponse({ status: 200, description: 'Return all enrollments.' })
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get enrollments by user' })
  @ApiResponse({ status: 200, description: 'Return enrollments for the user.' })
  @ApiParam({ name: 'userId', description: 'User ID', type: String })
  findByUser(@Param('userId') userId: string) {
    return this.enrollmentsService.findByUser(userId);
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get enrollments by course' })
  @ApiResponse({
    status: 200,
    description: 'Return enrollments for the course.',
  })
  @ApiParam({ name: 'courseId', description: 'Course ID', type: String })
  findByCourse(@Param('courseId') courseId: string) {
    return this.enrollmentsService.findByCourse(courseId);
  }
}
