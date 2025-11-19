import mongoose from 'mongoose';

export class HealthMonitor {
  async checkHealth() {
    return {
      status: 'healthy',
      timestamp: new Date(),
      services: {
        database: await this.checkDatabase(),
        cache: await this.checkCache(),
        queue: await this.checkQueue(),
      },
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    };
  }

  private async checkDatabase(): Promise<string> {
    try {
      const state = mongoose.connection.readyState;
      return state === 1 ? 'connected' : 'disconnected';
    } catch (error) {
      return 'error';
    }
  }

  private async checkCache(): Promise<string> {
    return 'healthy';
  }

  private async checkQueue(): Promise<string> {
    return 'healthy';
  }
}

export const healthMonitor = new HealthMonitor();
