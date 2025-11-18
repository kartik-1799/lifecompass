# Life Compass Backend - Implementation Guide

## Complete Setup Instructions

Follow these steps to set up the Life Compass backend:

### Step 1: Run Quick Setup

This creates the directory structure and core files:

```bash
node quick-setup.js
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create Remaining Files

```bash
node create-all-files.js
```

### Step 4: Set Up Environment

Copy the example environment file:

```bash
copy .env.example .env
```

Edit `.env` and configure:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secure random string for JWT signing
- `JWT_REFRESH_SECRET` - A secure random string for refresh tokens
- `PORT` - Server port (default: 5000)
- `CORS_ORIGIN` - Your frontend URL (default: http://localhost:3000)

### Step 5: Start MongoDB

Make sure MongoDB is running:
- Local: Start MongoDB service
- Atlas: Ensure your connection string is correct in `.env`

### Step 6: Run the Application

Development mode with hot reload:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

### Step 7: Test the API

Health check:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "success",
  "message": "Life Compass API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Created File Structure

After running all setup scripts, you'll have:

```
lifecompass/
├── src/
│   ├── config/
│   │   ├── database.ts              ✅ Created
│   │   └── constants.ts             ✅ Created
│   ├── models/
│   │   ├── User.model.ts            ✅ Created
│   │   ├── LearningPath.model.ts    ✅ Created
│   │   ├── Content.model.ts         ✅ Created
│   │   ├── Goal.model.ts            ✅ Created
│   │   └── Reflection.model.ts      ✅ Created
│   ├── controllers/
│   │   ├── auth.controller.ts       ⏳ To implement
│   │   ├── user.controller.ts       ⏳ To implement
│   │   ├── learningPath.controller.ts ⏳ To implement
│   │   ├── content.controller.ts    ⏳ To implement
│   │   ├── goal.controller.ts       ⏳ To implement
│   │   └── reflection.controller.ts ⏳ To implement
│   ├── services/
│   │   ├── auth.service.ts          ⏳ To implement
│   │   ├── user.service.ts          ⏳ To implement
│   │   ├── learningPath.service.ts  ⏳ To implement
│   │   ├── content.service.ts       ⏳ To implement
│   │   ├── goal.service.ts          ⏳ To implement
│   │   └── reflection.service.ts    ⏳ To implement
│   ├── middlewares/
│   │   ├── auth.middleware.ts       ✅ Created
│   │   ├── error.middleware.ts      ✅ Created
│   │   └── validation.middleware.ts ✅ Created
│   ├── routes/
│   │   ├── index.ts                 ✅ Created
│   │   ├── auth.routes.ts           ⏳ To implement
│   │   ├── user.routes.ts           ⏳ To implement
│   │   ├── learningPath.routes.ts   ⏳ To implement
│   │   ├── content.routes.ts        ⏳ To implement
│   │   ├── goal.routes.ts           ⏳ To implement
│   │   └── reflection.routes.ts     ⏳ To implement
│   ├── utils/
│   │   ├── jwt.util.ts              ✅ Created
│   │   ├── password.util.ts         ✅ Created
│   │   └── response.util.ts         ✅ Created
│   ├── types/
│   │   └── index.ts                 ✅ Created
│   └── server.ts                    ✅ Created
├── uploads/                         ✅ Created
├── .env.example                     ✅ Created
├── .gitignore                       ✅ Created
├── package.json                     ✅ Created
├── tsconfig.json                    ✅ Created
├── .eslintrc.json                   ✅ Created
└── README.md                        ✅ Created
```

## Next Steps: Implement Controllers, Services, and Routes

Now you need to implement the business logic. Here's the recommended order:

### 1. Authentication (Highest Priority)

**Auth Service** (`src/services/auth.service.ts`):
- `register(email, password, firstName, lastName)` - Register new user
- `login(email, password)` - Login user
- `refreshToken(refreshToken)` - Refresh access token

**Auth Controller** (`src/controllers/auth.controller.ts`):
- Handle requests and call auth service methods
- Return proper responses

**Auth Routes** (`src/routes/auth.routes.ts`):
- POST `/register` - Register user
- POST `/login` - Login user
- POST `/refresh` - Refresh token

### 2. User Management

**User Service** (`src/services/user.service.ts`):
- `getProfile(userId)` - Get user profile
- `updateProfile(userId, data)` - Update profile
- `updatePreferences(userId, preferences)` - Update preferences

**User Controller** (`src/controllers/user.controller.ts`):
- Handle user-related requests

**User Routes** (`src/routes/user.routes.ts`):
- GET `/profile` - Get current user profile (protected)
- PUT `/profile` - Update profile (protected)
- PUT `/preferences` - Update preferences (protected)

### 3. Learning Paths

**Learning Path Service** (`src/services/learningPath.service.ts`):
- `create(userId, data)` - Create learning path
- `getAll(userId, filters)` - Get all user's learning paths
- `getById(id, userId)` - Get specific learning path
- `update(id, userId, data)` - Update learning path
- `delete(id, userId)` - Delete learning path
- `updateProgress(id, userId, contentId)` - Update progress

**Learning Path Controller & Routes**: Similar pattern

### 4. Content Management

**Content Service** (`src/services/content.service.ts`):
- CRUD operations for content
- Filter by category, type, tags
- Track views, likes, completions

### 5. Goals

**Goal Service** (`src/services/goal.service.ts`):
- CRUD operations for goals
- Manage milestones
- Track progress

### 6. Reflections

**Reflection Service** (`src/services/reflection.service.ts`):
- CRUD operations for reflections
- Link to goals and content
- Filter by date, tags

## Implementation Templates

### Service Template

```typescript
import { Model } from '../models/YourModel.model';
import { AppError } from '../middlewares/error.middleware';
import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants';

export class YourService {
  async create(data: any) {
    const item = await Model.create(data);
    return item;
  }

  async getAll(userId: string) {
    const items = await Model.find({ userId });
    return items;
  }

  async getById(id: string, userId: string) {
    const item = await Model.findOne({ _id: id, userId });
    if (!item) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND);
    }
    return item;
  }

  async update(id: string, userId: string, data: any) {
    const item = await Model.findOneAndUpdate(
      { _id: id, userId },
      data,
      { new: true, runValidators: true }
    );
    if (!item) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND);
    }
    return item;
  }

  async delete(id: string, userId: string) {
    const item = await Model.findOneAndDelete({ _id: id, userId });
    if (!item) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND);
    }
    return item;
  }
}

export const yourService = new YourService();
```

### Controller Template

```typescript
import { Response } from 'express';
import { AuthRequest } from '../types';
import { yourService } from '../services/your.service';
import { asyncHandler } from '../middlewares/error.middleware';
import { sendSuccess } from '../utils/response.util';
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../config/constants';

export const create = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const data = req.body;
  
  const item = await yourService.create({ ...data, userId });
  
  sendSuccess(res, item, SUCCESS_MESSAGES.CREATED, HTTP_STATUS.CREATED);
});

export const getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  
  const items = await yourService.getAll(userId);
  
  sendSuccess(res, items, SUCCESS_MESSAGES.RETRIEVED);
});

// ... more controller methods
```

### Routes Template

```typescript
import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import * as controller from '../controllers/your.controller';

const router = Router();

router.use(authenticate); // Protect all routes

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
```

## Testing the API

Use tools like:
- **Postman** - https://www.postman.com/
- **Thunder Client** - VS Code extension
- **curl** - Command line

Example requests:

### Register
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

### Get Profile (with token)
```bash
curl -X GET http://localhost:5000/api/v1/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Common Issues and Solutions

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access for MongoDB Atlas

### Module Not Found
- Run `npm install`
- Check import paths
- Verify tsconfig.json paths configuration

### TypeScript Errors
- Run `npm run build` to see compilation errors
- Check type definitions
- Ensure all imports are correct

### Port Already in Use
- Change PORT in `.env`
- Kill the process using the port
- Use a different port number

## Additional Features to Implement

1. **Email Verification**
   - Send verification email on registration
   - Verify email endpoint

2. **Password Reset**
   - Request password reset
   - Reset with token

3. **Rate Limiting**
   - Prevent abuse
   - Limit requests per IP

4. **File Upload**
   - Avatar upload
   - Content files

5. **Search & Filtering**
   - Full-text search
   - Advanced filters

6. **Analytics**
   - User statistics
   - Progress tracking
   - Insights generation

7. **Notifications**
   - Email notifications
   - In-app notifications

8. **Social Features**
   - Share learning paths
   - Comments and discussions
   - Follow users

## Deployment

When ready to deploy:

1. **Environment Variables**
   - Set production values
   - Use strong secrets

2. **Database**
   - Use MongoDB Atlas for production
   - Set up backups

3. **Hosting Options**
   - Heroku
   - AWS
   - DigitalOcean
   - Vercel
   - Railway

4. **CI/CD**
   - Set up automated testing
   - Automated deployment

5. **Monitoring**
   - Error tracking (Sentry)
   - Performance monitoring
   - Logging

Good luck with your implementation! 🚀
