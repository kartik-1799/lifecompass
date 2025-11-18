export const databaseConfig = {
  development: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/lifecompass',
  },
  test: {
    uri: process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/lifecompass_test',
  },
  production: {
    uri: process.env.MONGODB_URI,
  },
};
