import Bull from 'bull';

interface EmailJob {
  to: string;
  subject: string;
  body: string;
  template?: string;
}

export const emailQueue = new Bull<EmailJob>('email', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
});

emailQueue.process(async (job) => {
  const { to, subject, body } = job.data;
  // Implement actual email sending logic here
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true };
});

export const addEmailToQueue = async (data: EmailJob) => {
  return await emailQueue.add(data, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
  });
};
