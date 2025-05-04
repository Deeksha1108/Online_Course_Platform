import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { MessageModule } from './messages/message.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/course-platform'),
    UsersModule,
    CoursesModule,
    EnrollmentsModule,
    MessageModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
