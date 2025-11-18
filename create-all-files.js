const fs = require('fs');
const path = require('path');

console.log('📝 Creating all project files...\n');

const files = {
  // Middlewares
  'src/middlewares/error.middleware.ts': `import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: 'error',
      message: ERROR_MESSAGES.VALIDATION_ERROR,
      errors: err.message,
    });
  }

  if (err.name === 'MongoServerError' && (err as any).code === 11000) {
    return res.status(HTTP_STATUS.CONFLICT).json({
      status: 'error',
      message: 'Duplicate field value',
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      status: 'error',
      message: ERROR_MESSAGES.INVALID_TOKEN,
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      status: 'error',
      message: 'Token expired',
    });
  }

  console.error('❌ Error:', err);
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: ERROR_MESSAGES.INTERNAL_ERROR,
  });
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
`,

  'src/middlewares/auth.middleware.ts': `import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, JwtPayload } from '../types';
import { AppError } from './error.middleware';
import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants';

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_TOKEN));
    } else {
      next(error);
    }
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN));
    }

    next();
  };
};
`,

  'src/middlewares/validation.middleware.ts': `import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { HTTP_STATUS } from '../config/constants';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      await validation.run(req);
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array(),
    });
  };
};
`,

  // Utils
  'src/utils/jwt.util.ts': `import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';

export const generateToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.sign(payload, secret, { expiresIn });
};

export const generateRefreshToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_REFRESH_SECRET;
  const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '30d';

  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET is not defined');
  }

  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.verify(token, secret) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_REFRESH_SECRET;

  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET is not defined');
  }

  return jwt.verify(token, secret) as JwtPayload;
};
`,

  'src/utils/password.util.ts': `import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
`,

  'src/utils/response.util.ts': `import { Response } from 'express';
import { ApiResponse } from '../types';
import { HTTP_STATUS } from '../config/constants';

export const sendSuccess = <T>(
  res: Response,
  data?: T,
  message?: string,
  statusCode: number = HTTP_STATUS.OK
): Response => {
  const response: ApiResponse<T> = {
    status: 'success',
    message,
    data,
  };

  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number = HTTP_STATUS.BAD_REQUEST,
  errors?: any[]
): Response => {
  const response: ApiResponse = {
    status: 'error',
    message,
    errors,
  };

  return res.status(statusCode).json(response);
};

export const sendPaginated = <T>(
  res: Response,
  data: T[],
  page: number,
  limit: number,
  total: number,
  message?: string
): Response => {
  const response: ApiResponse<T[]> = {
    status: 'success',
    message,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };

  return res.status(HTTP_STATUS.OK).json(response);
};
`,

  // Routes index
  'src/routes/index.ts': `import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import learningPathRoutes from './learningPath.routes';
import contentRoutes from './content.routes';
import goalRoutes from './goal.routes';
import reflectionRoutes from './reflection.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/learning-paths', learningPathRoutes);
router.use('/content', contentRoutes);
router.use('/goals', goalRoutes);
router.use('/reflections', reflectionRoutes);

export default router;
`,

  // Models - User
  'src/models/User.model.ts': `import mongoose, { Document, Schema } from 'mongoose';
import { USER_ROLES } from '../config/constants';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  isEmailVerified: boolean;
  preferences: {
    theme: string;
    notifications: boolean;
    language: string;
  };
  profile: {
    avatar?: string;
    bio?: string;
    interests: string[];
    goals: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    preferences: {
      theme: {
        type: String,
        default: 'light',
      },
      notifications: {
        type: Boolean,
        default: true,
      },
      language: {
        type: String,
        default: 'en',
      },
    },
    profile: {
      avatar: String,
      bio: String,
      interests: [String],
      goals: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });

export const User = mongoose.model<IUser>('User', userSchema);
`,

  // Models - LearningPath
  'src/models/LearningPath.model.ts': `import mongoose, { Document, Schema } from 'mongoose';
import { LEARNING_PATH_STATUS } from '../config/constants';

export interface ILearningPath extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: Array<{
    contentId: mongoose.Types.ObjectId;
    order: number;
    completed: boolean;
    completedAt?: Date;
  }>;
  status: string;
  progress: number;
  estimatedDuration: number;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const learningPathSchema = new Schema<ILearningPath>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: [String],
    content: [
      {
        contentId: {
          type: Schema.Types.ObjectId,
          ref: 'Content',
        },
        order: Number,
        completed: {
          type: Boolean,
          default: false,
        },
        completedAt: Date,
      },
    ],
    status: {
      type: String,
      enum: Object.values(LEARNING_PATH_STATUS),
      default: LEARNING_PATH_STATUS.NOT_STARTED,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    estimatedDuration: Number,
    startedAt: Date,
    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

learningPathSchema.index({ userId: 1, status: 1 });
learningPathSchema.index({ category: 1 });

export const LearningPath = mongoose.model<ILearningPath>('LearningPath', learningPathSchema);
`,

  // Models - Content
  'src/models/Content.model.ts': `import mongoose, { Document, Schema } from 'mongoose';
import { CONTENT_TYPES } from '../config/constants';

export interface IContent extends Document {
  title: string;
  description: string;
  type: string;
  url?: string;
  content?: string;
  author: string;
  category: string;
  tags: string[];
  duration?: number;
  difficulty: string;
  isPublic: boolean;
  createdBy: mongoose.Types.ObjectId;
  metadata: {
    views: number;
    likes: number;
    completions: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const contentSchema = new Schema<IContent>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(CONTENT_TYPES),
      required: true,
    },
    url: String,
    content: String,
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: [String],
    duration: Number,
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    metadata: {
      views: {
        type: Number,
        default: 0,
      },
      likes: {
        type: Number,
        default: 0,
      },
      completions: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

contentSchema.index({ category: 1, type: 1 });
contentSchema.index({ tags: 1 });
contentSchema.index({ isPublic: 1 });

export const Content = mongoose.model<IContent>('Content', contentSchema);
`,

  // Models - Goal
  'src/models/Goal.model.ts': `import mongoose, { Document, Schema } from 'mongoose';
import { GOAL_STATUS } from '../config/constants';

export interface IGoal extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  targetDate?: Date;
  milestones: Array<{
    title: string;
    description: string;
    completed: boolean;
    completedAt?: Date;
    dueDate?: Date;
  }>;
  progress: number;
  notes: string[];
  linkedLearningPaths: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const goalSchema = new Schema<IGoal>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(GOAL_STATUS),
      default: GOAL_STATUS.ACTIVE,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    targetDate: Date,
    milestones: [
      {
        title: {
          type: String,
          required: true,
        },
        description: String,
        completed: {
          type: Boolean,
          default: false,
        },
        completedAt: Date,
        dueDate: Date,
      },
    ],
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    notes: [String],
    linkedLearningPaths: [
      {
        type: Schema.Types.ObjectId,
        ref: 'LearningPath',
      },
    ],
  },
  {
    timestamps: true,
  }
);

goalSchema.index({ userId: 1, status: 1 });
goalSchema.index({ category: 1 });

export const Goal = mongoose.model<IGoal>('Goal', goalSchema);
`,

  // Models - Reflection
  'src/models/Reflection.model.ts': `import mongoose, { Document, Schema } from 'mongoose';

export interface IReflection extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  mood?: string;
  tags: string[];
  insights: string[];
  linkedGoals: mongoose.Types.ObjectId[];
  linkedContent: mongoose.Types.ObjectId[];
  isPrivate: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const reflectionSchema = new Schema<IReflection>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      enum: ['great', 'good', 'okay', 'challenging', 'difficult'],
    },
    tags: [String],
    insights: [String],
    linkedGoals: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Goal',
      },
    ],
    linkedContent: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Content',
      },
    ],
    isPrivate: {
      type: Boolean,
      default: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

reflectionSchema.index({ userId: 1, date: -1 });
reflectionSchema.index({ tags: 1 });

export const Reflection = mongoose.model<IReflection>('Reflection', reflectionSchema);
`
};

// Create all files
Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(__dirname, filePath);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, content);
  console.log(`✓ Created: ${filePath}`);
});

console.log('\n✅ All files created successfully!\n');
console.log('Remaining files to create manually:');
console.log('- Controllers (auth, user, learningPath, content, goal, reflection)');
console.log('- Services (auth, user, learningPath, content, goal, reflection)');
console.log('- Routes (auth, user, learningPath, content, goal, reflection)\n');
console.log('Run: node create-controllers-services.js to create these files');
