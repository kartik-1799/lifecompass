export const createTestUser = () => ({
  email: 'test@example.com',
  password: 'Test1234!',
  firstName: 'Test',
  lastName: 'User',
});

export const createTestGoal = (userId: string) => ({
  userId,
  title: 'Test Goal',
  description: 'Test goal description',
  category: 'Personal',
});

export const createTestContent = () => ({
  title: 'Test Content',
  description: 'Test content description',
  type: 'article',
  author: 'Test Author',
  category: 'Technology',
});
