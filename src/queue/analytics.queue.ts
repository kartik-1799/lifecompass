import Bull from 'bull';

interface AnalyticsJob {
  event: string;
  userId?: string;
  data: any;
  timestamp: Date;
}

export const analyticsQueue = new Bull<AnalyticsJob>('analytics', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
});

analyticsQueue.process(async (job) => {
  const { event, userId, data } = job.data;
  console.log(`Processing analytics event: ${event}`);
  // Store analytics data
  return { processed: true };
});
