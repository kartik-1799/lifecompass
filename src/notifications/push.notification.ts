export class PushNotification {
  async send(userId: string, title: string, body: string) {
    console.log(`Sending push to user ${userId}`);
    // Implementation
  }

  async sendGoalReminder(userId: string, goalTitle: string) {
    await this.send(userId, 'Goal Reminder', `Don't forget: ${goalTitle}`);
  }
}

export const pushNotification = new PushNotification();
