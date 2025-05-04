import { format, transports } from 'winston';
import { LOG_COLORS } from '../constants/logger.constants';
import type { TransformableInfo } from 'logform';

export const consoleTransport = new transports.Console({
  format: format.combine(
    format.colorize({ colors: LOG_COLORS }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf((info: TransformableInfo) => {
      const message = info.message as string;
      const context = (info.context as string) || 'App';
      const timestamp = String(info.timestamp);
      const trace = info.trace as string | undefined;
      return `${timestamp} [${context}] ${info.level}: ${message}${
        trace ? `\n${trace}` : ''
      }`;
    }),
  ),
});
