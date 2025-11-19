export class EventTracker {
  track(event: string, userId?: string, data?: any) {
    console.log(`Event: ${event}`, { userId, data, timestamp: new Date() });
    // Send to analytics service
  }

  trackPageView(page: string, userId?: string) {
    this.track('page_view', userId, { page });
  }

  trackAction(action: string, userId: string, data?: any) {
    this.track(`action_${action}`, userId, data);
  }
}

export const eventTracker = new EventTracker();
