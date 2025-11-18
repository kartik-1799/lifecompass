const fs = require('fs');
const path = require('path');

console.log('═══════════════════════════════════════════════════════');
console.log('    🧭 LIFE COMPASS BACKEND - COMPLETE SETUP');
console.log('═══════════════════════════════════════════════════════\n');

// Step 1: Create directory structure
console.log('📁 Step 1: Creating directory structure...');
const directories = [
  'src',
  'src/config',
  'src/models',
  'src/controllers',
  'src/services',
  'src/middlewares',
  'src/routes',
  'src/utils',
  'src/types',
  'uploads'
];

directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`  ✓ ${dir}`);
  }
});

fs.writeFileSync(path.join(__dirname, 'uploads', '.gitkeep'), '');
console.log('  ✓ uploads/.gitkeep');

// Function to create files
const createFile = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.writeFileSync(fullPath, content);
};

// Step 2: Create core configuration files
console.log('\n⚙️  Step 2: Creating core configuration files...');

createFile('src/server.ts', `import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { connectDatabase } from './config/database';
import { errorHandler } from './middlewares/error.middleware';
import routes from './routes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Life Compass API is running',
    timestamp: new Date().toISOString()
  });
});

app.use(\`/api/\${process.env.API_VERSION || 'v1'}\`, routes);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDatabase();
    
    app.listen(PORT, () => {
      console.log(\`🚀 Server is running on port \${PORT}\`);
      console.log(\`📊 Environment: \${process.env.NODE_ENV || 'development'}\`);
      console.log(\`🔗 API: http://localhost:\${PORT}/api/\${process.env.API_VERSION || 'v1'}\`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
`);
console.log('  ✓ src/server.ts');

createFile('src/config/database.ts', `import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/lifecompass';
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully');
    
    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error);
    throw error;
  }
};
`);
console.log('  ✓ src/config/database.ts');

createFile('src/config/constants.ts', `export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Validation error',
  INTERNAL_ERROR: 'Internal server error',
  INVALID_CREDENTIALS: 'Invalid credentials',
  USER_EXISTS: 'User already exists',
  USER_NOT_FOUND: 'User not found',
  INVALID_TOKEN: 'Invalid or expired token',
} as const;

export const SUCCESS_MESSAGES = {
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
  RETRIEVED: 'Resource retrieved successfully',
} as const;

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
} as const;

export const LEARNING_PATH_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  PAUSED: 'paused',
} as const;

export const CONTENT_TYPES = {
  ARTICLE: 'article',
  VIDEO: 'video',
  PODCAST: 'podcast',
  COURSE: 'course',
  BOOK: 'book',
} as const;

export const GOAL_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  ABANDONED: 'abandoned',
  ON_HOLD: 'on_hold',
} as const;
`);
console.log('  ✓ src/config/constants.ts');

console.log('\n📝 Setup script created successfully!');
console.log('\nTo complete the setup, run these commands in order:');
console.log('1. node setup-complete.js');
console.log('2. node create-all-files.js');
console.log('3. node create-auth-system.js');
console.log('4. node create-route-stubs.js');
console.log('5. npm install');
console.log('6. copy .env.example .env (and configure)');
console.log('7. npm run dev\n');
