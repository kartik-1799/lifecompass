const fs = require('fs');
const path = require('path');

console.log('🔐 Creating Authentication System...\n');

const authFiles = {
  'src/services/auth.service.ts': `import { User } from '../models/User.model';
import { AppError } from '../middlewares/error.middleware';
import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants';
import { hashPassword, comparePassword } from '../utils/password.util';
import { generateToken, generateRefreshToken } from '../utils/jwt.util';

export class AuthService {
  async register(email: string, password: string, firstName: string, lastName: string) {
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      throw new AppError(HTTP_STATUS.CONFLICT, ERROR_MESSAGES.USER_EXISTS);
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
      refreshToken,
    };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const { verifyRefreshToken } = require('../utils/jwt.util');
      const payload = verifyRefreshToken(refreshToken);

      const user = await User.findById(payload.id);

      if (!user) {
        throw new AppError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.USER_NOT_FOUND);
      }

      const newToken = generateToken({
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      });

      return { token: newToken };
    } catch (error) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_TOKEN);
    }
  }
}

export const authService = new AuthService();
`,

  'src/controllers/auth.controller.ts': `import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { asyncHandler } from '../middlewares/error.middleware';
import { sendSuccess } from '../utils/response.util';
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../config/constants';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  const result = await authService.register(email, password, firstName, lastName);

  sendSuccess(
    res,
    result,
    'User registered successfully',
    HTTP_STATUS.CREATED
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.login(email, password);

  sendSuccess(res, result, 'Login successful');
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  const result = await authService.refreshToken(refreshToken);

  sendSuccess(res, result, 'Token refreshed successfully');
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  sendSuccess(res, null, 'Logout successful');
});
`,

  'src/routes/auth.routes.ts': `import { Router } from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';

const router = Router();

const registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/)
    .withMessage('Password must contain uppercase, lowercase, and number'),
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters'),
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

const refreshTokenValidation = [
  body('refreshToken')
    .notEmpty()
    .withMessage('Refresh token is required'),
];

router.post('/register', validate(registerValidation), authController.register);
router.post('/login', validate(loginValidation), authController.login);
router.post('/refresh', validate(refreshTokenValidation), authController.refreshToken);
router.post('/logout', authController.logout);

export default router;
`,

  'src/services/user.service.ts': `import { User } from '../models/User.model';
import { AppError } from '../middlewares/error.middleware';
import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants';

export class UserService {
  async getProfile(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      preferences: user.preferences,
      profile: user.profile,
      createdAt: user.createdAt,
    };
  }

  async updateProfile(userId: string, data: any) {
    const allowedUpdates = ['firstName', 'lastName', 'profile'];
    const updates: any = {};

    Object.keys(data).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updates[key] = data[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      preferences: user.preferences,
      profile: user.profile,
    };
  }

  async updatePreferences(userId: string, preferences: any) {
    const user = await User.findByIdAndUpdate(
      userId,
      { preferences },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return user.preferences;
  }
}

export const userService = new UserService();
`,

  'src/controllers/user.controller.ts': `import { Response } from 'express';
import { AuthRequest } from '../types';
import { userService } from '../services/user.service';
import { asyncHandler } from '../middlewares/error.middleware';
import { sendSuccess } from '../utils/response.util';
import { SUCCESS_MESSAGES } from '../config/constants';

export const getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  const profile = await userService.getProfile(userId);

  sendSuccess(res, profile, SUCCESS_MESSAGES.RETRIEVED);
});

export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const data = req.body;

  const profile = await userService.updateProfile(userId, data);

  sendSuccess(res, profile, SUCCESS_MESSAGES.UPDATED);
});

export const updatePreferences = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const preferences = req.body;

  const updatedPreferences = await userService.updatePreferences(userId, preferences);

  sendSuccess(res, updatedPreferences, SUCCESS_MESSAGES.UPDATED);
});
`,

  'src/routes/user.routes.ts': `import { Router } from 'express';
import { body } from 'express-validator';
import * as userController from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';

const router = Router();

router.use(authenticate);

const updateProfileValidation = [
  body('firstName').optional().trim().isLength({ min: 2 }),
  body('lastName').optional().trim().isLength({ min: 2 }),
  body('profile.bio').optional().isString(),
  body('profile.interests').optional().isArray(),
  body('profile.goals').optional().isArray(),
];

const updatePreferencesValidation = [
  body('theme').optional().isIn(['light', 'dark']),
  body('notifications').optional().isBoolean(),
  body('language').optional().isString(),
];

router.get('/profile', userController.getProfile);
router.put('/profile', validate(updateProfileValidation), userController.updateProfile);
router.put('/preferences', validate(updatePreferencesValidation), userController.updatePreferences);

export default router;
`,
};

// Create auth files
Object.entries(authFiles).forEach(([filePath, content]) => {
  const fullPath = path.join(__dirname, filePath);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, content);
  console.log(`✓ Created: ${filePath}`);
});

console.log('\n✅ Authentication system created successfully!\n');
console.log('You can now:');
console.log('1. Run: npm run dev');
console.log('2. Test register: POST http://localhost:5000/api/v1/auth/register');
console.log('3. Test login: POST http://localhost:5000/api/v1/auth/login');
console.log('4. Test profile: GET http://localhost:5000/api/v1/users/profile\n');
