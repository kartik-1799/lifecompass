export class EmailNotification {
  async send(to: string, subject: string, body: string) {
    console.log(`Sending email to ${to}`);
    // Implementation
  }

  async sendWelcome(email: string, name: string) {
    await this.send(email, 'Welcome!', `Hello ${name}`);
  }

  async sendPasswordReset(email: string, token: string) {
    await this.send(email, 'Password Reset', `Token: ${token}`);
  }
}

export const emailNotification = new EmailNotification();
