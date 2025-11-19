describe('Database Performance', () => {
  it('should query 1000 records in under 1 second', async () => {
    const start = Date.now();
    // Perform query
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(1000);
  });
});
