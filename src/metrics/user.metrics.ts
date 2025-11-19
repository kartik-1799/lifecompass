export class UserMetrics {
  async getActiveUsers(period: 'day' | 'week' | 'month') {
    // Implementation
    return { count: 0, period };
  }

  async getNewUsers(period: 'day' | 'week' | 'month') {
    // Implementation
    return { count: 0, period };
  }

  async getUserGrowth() {
    // Implementation
    return { growth: 0, percentage: 0 };
  }
}

export const userMetrics = new UserMetrics();
