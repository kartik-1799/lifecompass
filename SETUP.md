# Life Compass Backend - Setup Guide

## Quick Start

### Step 1: Create Directory Structure

Run the batch script to create all necessary directories:

```bash
create-structure.bat
```

Or manually create these directories:
- src/
- src/config/
- src/models/
- src/controllers/
- src/services/
- src/middlewares/
- src/routes/
- src/utils/
- src/types/
- uploads/

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Configuration

Copy the example environment file:

```bash
copy .env.example .env
```

Then edit `.env` and configure:
- MongoDB connection string
- JWT secrets
- Port and other settings

### Step 4: Create Source Files

After running the batch script, you'll need to manually create the source files in the `src/` directory or use the provided templates.

## Project Structure

```
lifecompass/
├── src/
│   ├── config/
│   │   ├── database.ts         # MongoDB connection
│   │   └── constants.ts        # Application constants
│   ├── models/
│   │   ├── User.model.ts
│   │   ├── LearningPath.model.ts
│   │   ├── Content.model.ts
│   │   ├── Goal.model.ts
│   │   └── Reflection.model.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── learningPath.controller.ts
│   │   ├── content.controller.ts
│   │   ├── goal.controller.ts
│   │   └── reflection.controller.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── learningPath.service.ts
│   │   ├── content.service.ts
│   │   ├── goal.service.ts
│   │   └── reflection.service.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── routes/
│   │   ├── index.ts
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── learningPath.routes.ts
│   │   ├── content.routes.ts
│   │   ├── goal.routes.ts
│   │   └── reflection.routes.ts
│   ├── utils/
│   │   ├── jwt.util.ts
│   │   ├── password.util.ts
│   │   └── response.util.ts
│   ├── types/
│   │   └── index.ts
│   └── server.ts
├── uploads/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── .eslintrc.json
└── README.md
```

## Development Commands

```bash
# Run in development mode with hot reload
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint code
npm run lint

# Run tests
npm test
```

## Database Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Update the `MONGODB_URI` in your `.env` file
3. The application will automatically connect on startup

## API Endpoints

Once running, the API will be available at:
- Local: `http://localhost:5000/api/v1`
- Health check: `http://localhost:5000/health`

### Available Endpoints

#### Authentication
- POST `/api/v1/auth/register` - Register new user
- POST `/api/v1/auth/login` - Login user
- POST `/api/v1/auth/refresh` - Refresh token
- POST `/api/v1/auth/logout` - Logout user

#### Users
- GET `/api/v1/users/profile` - Get current user profile
- PUT `/api/v1/users/profile` - Update user profile
- PUT `/api/v1/users/preferences` - Update user preferences

#### Learning Paths
- GET `/api/v1/learning-paths` - Get all learning paths
- POST `/api/v1/learning-paths` - Create learning path
- GET `/api/v1/learning-paths/:id` - Get learning path by ID
- PUT `/api/v1/learning-paths/:id` - Update learning path
- DELETE `/api/v1/learning-paths/:id` - Delete learning path
- POST `/api/v1/learning-paths/:id/progress` - Update progress

#### Content
- GET `/api/v1/content` - Get all content
- POST `/api/v1/content` - Create content
- GET `/api/v1/content/:id` - Get content by ID
- PUT `/api/v1/content/:id` - Update content
- DELETE `/api/v1/content/:id` - Delete content

#### Goals
- GET `/api/v1/goals` - Get all goals
- POST `/api/v1/goals` - Create goal
- GET `/api/v1/goals/:id` - Get goal by ID
- PUT `/api/v1/goals/:id` - Update goal
- DELETE `/api/v1/goals/:id` - Delete goal
- POST `/api/v1/goals/:id/milestones` - Add milestone

#### Reflections
- GET `/api/v1/reflections` - Get all reflections
- POST `/api/v1/reflections` - Create reflection
- GET `/api/v1/reflections/:id` - Get reflection by ID
- PUT `/api/v1/reflections/:id` - Update reflection
- DELETE `/api/v1/reflections/:id` - Delete reflection

## Troubleshooting

### Port Already in Use
If port 5000 is already in use, change the `PORT` in your `.env` file.

### MongoDB Connection Error
- Ensure MongoDB is running
- Check your connection string in `.env`
- Verify network access if using MongoDB Atlas

### Module Not Found Errors
Run `npm install` to ensure all dependencies are installed.

## Next Steps After Setup

1. Run the application: `npm run dev`
2. Test the health endpoint: `curl http://localhost:5000/health`
3. Start implementing additional features
4. Add tests for your endpoints
5. Set up API documentation with Swagger

## Additional Resources

- [Express Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
