# 🧭 Life Compass Backend - Quick Reference

## ⚡ Setup in 5 Commands

```bash
node quick-setup.js && node create-all-files.js && node create-auth-system.js && node create-route-stubs.js
npm install
copy .env.example .env
# Edit .env with your MongoDB URI and JWT secrets
npm run dev
```

---

## 📡 API Quick Reference

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

#### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

### User Endpoints (Protected)

#### Get Profile
```http
GET /users/profile
Authorization: Bearer YOUR_TOKEN
```

#### Update Profile
```http
PUT /users/profile
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "profile": {
    "bio": "Learning enthusiast",
    "interests": ["coding", "reading"]
  }
}
```

#### Update Preferences
```http
PUT /users/preferences
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "theme": "dark",
  "notifications": true,
  "language": "en"
}
```

---

## 🗂️ Project Structure

```
src/
├── config/          → database.ts, constants.ts
├── models/          → All Mongoose schemas
├── controllers/     → Request handlers
├── services/        → Business logic
├── middlewares/     → auth, error, validation
├── routes/          → API route definitions
├── utils/           → jwt, password, response
├── types/           → TypeScript definitions
└── server.ts        → Entry point
```

---

## 🔑 Environment Variables

```env
NODE_ENV=development
PORT=5000
API_VERSION=v1
MONGODB_URI=mongodb://localhost:27017/lifecompass
JWT_SECRET=your-secret-here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret-here
JWT_REFRESH_EXPIRES_IN=30d
CORS_ORIGIN=http://localhost:3000
```

---

## 🛠️ npm Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run production server |
| `npm run lint` | Lint TypeScript code |

---

## 🗄️ Database Models

### User
- email, password, firstName, lastName
- role, isEmailVerified
- preferences (theme, notifications, language)
- profile (avatar, bio, interests, goals)

### Learning Path
- userId, title, description, category, tags
- content[], status, progress
- estimatedDuration, startedAt, completedAt

### Content
- title, description, type, url, content
- author, category, tags, duration, difficulty
- createdBy, metadata (views, likes, completions)

### Goal
- userId, title, description, category
- status, priority, targetDate
- milestones[], progress, notes
- linkedLearningPaths[]

### Reflection
- userId, title, content, mood, tags
- insights[], linkedGoals[], linkedContent[]
- isPrivate, date

---

## 🔐 Authentication Flow

1. **Register** → Returns user + token + refreshToken
2. **Login** → Returns user + token + refreshToken
3. **Use token** → Add to Authorization header: `Bearer TOKEN`
4. **Refresh** → Use refreshToken to get new token
5. **Logout** → Client discards tokens

---

## 🚨 Error Handling

All errors return:
```json
{
  "status": "error",
  "message": "Error description"
}
```

HTTP Status Codes:
- 200: OK
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error

---

## ✅ Status Codes

### User Roles
- `user` - Regular user
- `admin` - Administrator
- `moderator` - Content moderator

### Learning Path Status
- `not_started` - Not begun
- `in_progress` - Currently learning
- `completed` - Finished
- `paused` - Temporarily stopped

### Goal Status
- `active` - Currently working on
- `completed` - Achieved
- `abandoned` - No longer pursuing
- `on_hold` - Paused

### Content Types
- `article` - Written content
- `video` - Video content
- `podcast` - Audio content
- `course` - Full course
- `book` - Book/eBook

---

## 🧪 Test Commands (curl)

### Health Check
```bash
curl http://localhost:5000/health
```

### Register
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test1234!","firstName":"Test","lastName":"User"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test1234!"}'
```

### Get Profile
```bash
curl http://localhost:5000/api/v1/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🔧 Common Tasks

### Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Check MongoDB Connection
```bash
mongosh mongodb://localhost:27017/lifecompass
```

### Kill Port Process (Windows)
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Rebuild node_modules
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Validation Rules

### Password Requirements
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number

### Email
- Valid email format
- Normalized to lowercase

### Names
- Minimum 2 characters
- Trimmed whitespace

---

## 🎯 Implementation Priority

1. ✅ **Done:** Auth + User management
2. ⏳ **Next:** Learning Paths
3. ⏳ **Then:** Content
4. ⏳ **After:** Goals
5. ⏳ **Finally:** Reflections

---

## 📚 File References

| Need | File |
|------|------|
| Getting Started | START_HERE.md |
| Setup Steps | EXECUTION_STEPS.md |
| Implementation Help | IMPLEMENTATION_GUIDE.md |
| Code Templates | SOURCE_FILES_TEMPLATES.md |
| Project Overview | PROJECT_SUMMARY.md |
| This Reference | QUICK_REFERENCE.md |

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't connect to MongoDB | Check MONGODB_URI, ensure MongoDB is running |
| Port in use | Change PORT in .env or kill process |
| Module not found | Run `npm install` |
| JWT error | Check JWT_SECRET in .env |
| Validation fails | Check request body format |

---

## 💡 Tips

- Use Postman or Thunder Client for API testing
- Keep .env file secret (never commit)
- Use strong random strings for JWT secrets
- Test with MongoDB Compass for database inspection
- Check console logs for detailed errors
- Use nodemon - server auto-restarts on changes

---

## 🎉 Quick Win Test

```bash
# 1. Start server
npm run dev

# 2. Register (in another terminal)
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"me@test.com","password":"Test1234!","firstName":"My","lastName":"Name"}'

# 3. Copy the token from response

# 4. Get profile
curl http://localhost:5000/api/v1/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Success! 🎉
```

---

**Keep this file handy for quick reference!** 📌
