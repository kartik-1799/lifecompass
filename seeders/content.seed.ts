import { Content } from '../src/models/Content.model';

export async function seed() {
  const content = [
    {
      title: 'Getting Started with Personal Growth',
      description: 'A comprehensive guide to personal development',
      type: 'article',
      author: 'John Doe',
      category: 'Personal Development',
      difficulty: 'beginner',
      isPublic: true,
      createdBy: '507f1f77bcf86cd799439011', // Replace with actual user ID
    },
  ];

  await Content.insertMany(content);
  console.log('Content seeded');
}
