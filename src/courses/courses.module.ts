import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './course.schema';
import { UsersModule } from 'src/users/users.module';
import { CoursesService } from './course.service';
import { CoursesController } from './course.controller';
import { EnrollmentsModule } from 'src/enrollments/enrollments.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    UsersModule,
    forwardRef(()=>EnrollmentsModule),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService]
})
export class CoursesModule {}