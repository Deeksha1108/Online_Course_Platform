import { format, transports } from 'winston';

export const fileTransport = (filename: string, level: string) =>
  new transports.File({
    filename,
    level,
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.json(),
    ),
  });
