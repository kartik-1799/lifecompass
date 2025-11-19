export class RateLimiterService {
  private requests = new Map<string, number[]>();

  isRateLimited(identifier: string, limit: number = 100, window: number = 60000): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    
    // Filter requests within window
    const recentRequests = userRequests.filter(time => now - time < window);
    
    if (recentRequests.length >= limit) {
      return true;
    }
    
    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);
    return false;
  }

  reset(identifier: string): void {
    this.requests.delete(identifier);
  }
}

export const rateLimiterService = new RateLimiterService();
