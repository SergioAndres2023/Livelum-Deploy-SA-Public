import pino from 'pino';
import config from '../../../../config/index';

export interface Logger {
  info(message: string, data?: any): void;
  warn(message: string, data?: any): void;
  error(message: string, data?: any): void;
  debug(message: string, data?: any): void;
}

export class PinoLogger implements Logger {
  private logger: pino.Logger;

  constructor() {
    const isDevelopment = config.env === 'development';
    
    this.logger = pino({
      level: isDevelopment ? 'debug' : 'info',
      transport: isDevelopment ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      } : undefined,
      formatters: {
        level: (label) => {
          return { level: label };
        },
      },
      timestamp: pino.stdTimeFunctions.isoTime,
    });
  }

  info(message: string, data?: any): void {
    this.logger.info(data, message);
  }

  warn(message: string, data?: any): void {
    this.logger.warn(data, message);
  }

  error(message: string, data?: any): void {
    this.logger.error(data, message);
  }

  debug(message: string, data?: any): void {
    this.logger.debug(data, message);
  }
}
