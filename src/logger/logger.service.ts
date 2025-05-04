import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, Logger, transports } from 'winston';
import { LOG_LEVELS } from './constants/logger.constants';
import { consoleTransport } from './transports/console.transport';
import { fileTransport } from './transports/file.transport';

@Injectable()
export class WinstonLogger implements LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      levels: LOG_LEVELS,
      transports: [
        consoleTransport,
        fileTransport('logs/error.log', 'error'),
        fileTransport('logs/combined.log', 'info'),
      ],
      exceptionHandlers: [
        new transports.File({ filename: 'logs/exceptions.log' }),
      ],
      rejectionHandlers: [
        new transports.File({ filename: 'logs/rejections.log' }),
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }
}
