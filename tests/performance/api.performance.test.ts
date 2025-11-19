import autocannon from 'autocannon';

describe('API Performance Tests', () => {
  it('should handle 100 concurrent requests', async () => {
    const result = await autocannon({
      url: 'http://localhost:5000/health',
      connections: 100,
      duration: 10,
    });
    
    expect(result.errors).toBe(0);
    expect(result.timeouts).toBe(0);
  });
});
