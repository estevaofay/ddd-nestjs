import { Params } from 'nestjs-pino';

export const loggerConfig: Params = {
  pinoHttp: {
    messageKey: 'message',
    level: String(process.env.LOG_LEVEL || 'info').toLowerCase(),
    formatters: {
      level: (label) => ({ level: label.toUpperCase() }),
    },
  },
};
