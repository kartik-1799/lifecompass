import Bull from 'bull';

interface NotificationJob {
  userId: string;
  type: string;
  message: string;
  data?: any;
}

export const notificationQueue = new Bull<NotificationJob>('notification', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
});

notificationQueue.process(async (job) => {
  const { userId, type, message } = job.data;
  console.log(`Sending ${type} notification to user ${userId}`);
  // Implement notification logic
  return { success: true };
});
