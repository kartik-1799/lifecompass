# 🧭 Life Compass Backend - START HERE

Welcome to the Life Compass backend implementation! This guide will walk you through setting up the complete backend infrastructure.

## 🎯 What You're Building

A personal growth and learning platform backend with:
- **User Authentication** - Secure JWT-based authentication
- **Learning Paths** - Custom learning journeys with progress tracking
- **Content Management** - Articles, videos, courses, and resources
- **Goal Tracking** - Personal goals with milestones and achievements
- **Reflections** - Daily reflections and insights
- **Progress Analytics** - Track learning and growth metrics

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Security**: Helmet, CORS, bcrypt

## 🚀 Quick Start (Automated Setup)

### Step 1: Run Setup Scripts

Execute these commands in order:

```bash
node quick-setup.js
node create-all-files.js
node create-auth-system.js
node create-route-stubs.js
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment

```bash
copy .env.example .env
```

Edit `.env` file and set:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A strong random string (e.g., generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- `JWT_REFRESH_SECRET` - Another strong random string
- Other settings as needed

### Step 4: Start MongoDB

Ensure MongoDB is running:
- **Local**: Start MongoDB service
- **Cloud**: Use MongoDB Atlas (https://www.mongodb.com/cloud/atlas)

### Step 5: Run the Application

```bash
npm run dev
```

The server will start on http://localhost:5000

## ✅ Verify Installation

Test the health endpoint:

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

## 📡 Test the API

### Register a New User

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

Save the `token` from the response!

### Get User Profile

```bash
curl -X GET http://localhost:5000/api/v1/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📂 Project Structure

```
lifecompass/
├── src/
│   ├── config/              # Configuration files
│   │   ├── database.ts      # MongoDB connection
│   │   └── constants.ts     # App constants
│   ├── models/              # Mongoose models
│   │   ├── User.model.ts
│   │   ├── LearningPath.model.ts
│   │   ├── Content.model.ts
│   │   ├── Goal.model.ts
│   │   └── Reflection.model.ts
│   ├── controllers/         # Request handlers
│   │   ├── auth.controller.ts
│   │   └── user.controller.ts
│   ├── services/            # Business logic
│   │   ├── auth.service.ts
│   │   └── user.service.ts
│   ├── middlewares/         # Custom middleware
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── routes/              # API routes
│   │   ├── index.ts
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── learningPath.routes.ts (stub)
│   │   ├── content.routes.ts (stub)
│   │   ├── goal.routes.ts (stub)
│   │   └── reflection.routes.ts (stub)
│   ├── utils/               # Utility functions
│   │   ├── jwt.util.ts
│   │   ├── password.util.ts
│   │   └── response.util.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   └── server.ts            # Entry point
├── uploads/                 # File uploads directory
├── .env                     # Environment variables
├── .env.example             # Example environment file
├── .gitignore               # Git ignore file
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── .eslintrc.json           # ESLint config
└── README.md                # Documentation
```

## 🔑 Available Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

### Users (Protected)
- `GET /api/v1/users/profile` - Get current user profile
- `PUT /api/v1/users/profile` - Update user profile
- `PUT /api/v1/users/preferences` - Update user preferences

### Learning Paths (Protected - Stub)
- `GET /api/v1/learning-paths` - Coming soon

### Content (Protected - Stub)
- `GET /api/v1/content` - Coming soon

### Goals (Protected - Stub)
- `GET /api/v1/goals` - Coming soon

### Reflections (Protected - Stub)
- `GET /api/v1/reflections` - Coming soon

## 📚 What's Implemented

✅ **Core Infrastructure**
- Express server with TypeScript
- MongoDB connection
- Error handling middleware
- Authentication middleware
- JWT utilities
- Password hashing utilities
- Response utilities

✅ **Database Models**
- User model
- Learning Path model
- Content model
- Goal model
- Reflection model

✅ **Authentication System**
- User registration
- User login
- Token refresh
- Password hashing
- JWT generation

✅ **User Management**
- Get profile
- Update profile
- Update preferences

## 🔨 What's Next (To Implement)

The following features need to be implemented:

### 1. Learning Paths Module
- Create learning path
- Get all learning paths
- Get learning path by ID
- Update learning path
- Delete learning path
- Update progress
- Add/remove content items

### 2. Content Module
- Create content
- Get all content
- Get content by ID
- Update content
- Delete content
- Filter by type, category, tags
- Track views and completions

### 3. Goals Module
- Create goal
- Get all goals
- Get goal by ID
- Update goal
- Delete goal
- Add/complete milestones
- Track progress

### 4. Reflections Module
- Create reflection
- Get all reflections
- Get reflection by ID
- Update reflection
- Delete reflection
- Filter by date, tags, mood

### 5. Additional Features
- Email verification
- Password reset
- File upload (avatars, content)
- Search functionality
- Pagination
- Rate limiting
- Advanced analytics
- Notifications

## 📖 Implementation Guide

See `IMPLEMENTATION_GUIDE.md` for detailed instructions on implementing remaining features, including:
- Code templates
- Best practices
- Testing strategies
- Deployment guide

## 🧪 Testing

Use tools like:
- **Postman** - https://www.postman.com/
- **Thunder Client** - VS Code extension
- **curl** - Command line

Example Postman collection structure:
```
Life Compass API/
├── Auth/
│   ├── Register
│   ├── Login
│   └── Refresh Token
├── Users/
│   ├── Get Profile
│   ├── Update Profile
│   └── Update Preferences
└── ...
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running
- Verify `MONGODB_URI` in `.env`
- Check network access for MongoDB Atlas

### Port Already in Use
- Change `PORT` in `.env`
- Kill process using port: `netstat -ano | findstr :5000`

### TypeScript Compilation Errors
- Run `npm run build` to see errors
- Check import paths
- Verify all dependencies are installed

### Module Not Found
- Run `npm install`
- Delete `node_modules` and `package-lock.json`, then `npm install` again

## 📜 Available Scripts

```bash
npm run dev        # Start development server with hot reload
npm run build      # Build TypeScript to JavaScript
npm start          # Start production server
npm run lint       # Run ESLint
npm test           # Run tests (when implemented)
```

## 🔒 Security Best Practices

1. **Never commit `.env` file** - Contains sensitive data
2. **Use strong JWT secrets** - Generate random 32+ character strings
3. **Use HTTPS in production** - Never send tokens over HTTP
4. **Implement rate limiting** - Prevent abuse
5. **Validate all inputs** - Use express-validator
6. **Hash passwords** - Using bcrypt (already implemented)
7. **Set secure headers** - Using Helmet (already implemented)

## 🌐 Deployment

When ready to deploy:

1. **Set production environment variables**
2. **Use MongoDB Atlas** for production database
3. **Choose a hosting platform**:
   - Heroku
   - AWS (EC2, Elastic Beanstalk)
   - DigitalOcean
   - Railway
   - Render
   - Vercel (Serverless)

4. **Set up CI/CD pipeline**
5. **Add monitoring and logging**

## 📞 Support

If you encounter issues:
1. Check this document
2. Review `IMPLEMENTATION_GUIDE.md`
3. Check the error logs in console
4. Review MongoDB connection
5. Verify environment variables

## 🎉 Congratulations!

You've successfully set up the Life Compass backend! The authentication and user management systems are fully functional. Now you can:

1. Test the existing endpoints
2. Implement remaining features (Learning Paths, Content, Goals, Reflections)
3. Add advanced features (search, analytics, notifications)
4. Deploy to production

Happy coding! 🚀
