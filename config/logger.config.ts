export const loggerConfig = {
  level: process.env.LOG_LEVEL || 'info',
  format: 'json',
  directory: 'logs',
};
