export class AnalyticsService {
  async getUserAnalytics(userId: string) {
    return {
      totalSessions: 0,
      avgSessionDuration: 0,
      completedGoals: 0,
      learningPaths: 0,
      reflections: 0,
    };
  }

  async getSystemAnalytics() {
    return {
      totalUsers: 0,
      activeUsers: 0,
      totalContent: 0,
      totalGoals: 0,
    };
  }
}

export const analyticsService = new AnalyticsService();
