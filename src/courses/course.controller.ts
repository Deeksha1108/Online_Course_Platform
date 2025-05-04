import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { CoursesService } from './course.service';
import { DeleteCourseDto } from './dto/delete-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { WinstonLogger } from 'src/logger/logger.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly logger: WinstonLogger,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({
    status: 201,
    description: 'The course has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateCourseDto })
  create(@Body() createCourseDto: CreateCourseDto) {
    this.logger.log('Creating new course', 'CoursesController');
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'Return all courses.' })
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a course by ID' })
  @ApiResponse({ status: 200, description: 'Return the course.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  @ApiParam({ name: 'id', description: 'Course ID', type: String })
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a course' })
  @ApiResponse({
    status: 200,
    description: 'The course has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  @ApiParam({ name: 'id', description: 'Course ID', type: String })
  @ApiBody({ type: UpdateCourseDto })
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update({ ...updateCourseDto, courseId: id });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a course' })
  @ApiResponse({
    status: 200,
    description: 'The course has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Course not found or Unauthorized' })
  @ApiParam({ name: 'id', description: 'Course ID', type: String })
  @ApiBody({ type: DeleteCourseDto })
  delete(@Body() deleteCourseDto: DeleteCourseDto) {
    return this.coursesService.delete(deleteCourseDto);
  }
}
