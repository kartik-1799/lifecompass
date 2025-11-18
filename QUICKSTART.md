# ⚡ Life Compass Backend - QUICKSTART

## 🎉 BUILD COMPLETE - READY TO RUN!

Your Life Compass backend is **fully built** and ready to start!

---

## 🚀 Start in 3 Steps

### Step 1: Ensure MongoDB is Running

**Option A - Local MongoDB:**
```cmd
net start MongoDB
```

**Option B - MongoDB Atlas (Cloud):**
Already configured in `.env` if you updated `MONGODB_URI`

**Check Connection:**
```cmd
mongosh mongodb://localhost:27017/lifecompass
```

---

### Step 2: Start the Server

**Easiest Way:**
```cmd
start-dev.bat
```

**Or use npm:**
```cmd
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server is running on port 5000
📊 Environment: development
🔗 API: http://localhost:5000/api/v1
```

---

### Step 3: Test the API

**Open in browser:**
```
http://localhost:5000/health
```

Should return:
```json
{
  "status": "success",
  "message": "Life Compass API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**✅ Success! Your backend is running!**

---

## 🧪 Quick API Test

### 1. Register a User

**Using PowerShell:**
```powershell
$body = @{
    email = "test@example.com"
    password = "Test1234!"
    firstName = "Test"
    lastName = "User"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/v1/auth/register" -Method Post -ContentType "application/json" -Body $body
```

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"Test1234!\",\"firstName\":\"Test\",\"lastName\":\"User\"}"
```

**Save the token from the response!**

---

### 2. Get User Profile

Replace `YOUR_TOKEN` with the token from step 1:

**Using PowerShell:**
```powershell
$headers = @{
    Authorization = "Bearer YOUR_TOKEN"
}
Invoke-RestMethod -Uri "http://localhost:5000/api/v1/users/profile" -Headers $headers
```

**Using curl:**
```bash
curl http://localhost:5000/api/v1/users/profile ^
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📮 Use Postman (Recommended)

1. **Import Collection:**
   - Open Postman
   - File → Import
   - Select `POSTMAN_COLLECTION.json`

2. **Create Environment:**
   - Click Environments
   - Add new environment: "Life Compass Dev"
   - Variables:
     - `baseUrl`: `http://localhost:5000`
     - `apiVersion`: `v1`
     - `token`: (leave empty, auto-filled on login)
     - `refreshToken`: (leave empty, auto-filled on login)

3. **Test Endpoints:**
   - Run "Register" → Token auto-saved
   - Run "Get Profile" → Uses saved token
   - All authentication handled automatically!

---

## ✅ What's Working

### 8 Fully Functional Endpoints:

1. **GET** `/health` - Health check
2. **POST** `/api/v1/auth/register` - Register user
3. **POST** `/api/v1/auth/login` - Login
4. **POST** `/api/v1/auth/refresh` - Refresh token
5. **POST** `/api/v1/auth/logout` - Logout
6. **GET** `/api/v1/users/profile` - Get profile (protected)
7. **PUT** `/api/v1/users/profile` - Update profile (protected)
8. **PUT** `/api/v1/users/preferences` - Update preferences (protected)

### Complete Infrastructure:

✅ Express server with TypeScript  
✅ MongoDB connection  
✅ JWT authentication  
✅ Password hashing  
✅ Input validation  
✅ Error handling  
✅ Security headers  
✅ CORS configured  
✅ All database models  

---

## 🔨 Next: Implement Features

Now that the core is working, implement these modules:

### Priority 1: Learning Paths
**Create:**
- `src/services/learningPath.service.ts`
- `src/controllers/learningPath.controller.ts`

**Update:**
- `src/routes/learningPath.routes.ts`

**See:** `IMPLEMENTATION_GUIDE.md` for templates

### Priority 2: Content
**Create:**
- `src/services/content.service.ts`
- `src/controllers/content.controller.ts`

**Update:**
- `src/routes/content.routes.ts`

### Priority 3: Goals
**Create:**
- `src/services/goal.service.ts`
- `src/controllers/goal.controller.ts`

**Update:**
- `src/routes/goal.routes.ts`

### Priority 4: Reflections
**Create:**
- `src/services/reflection.service.ts`
- `src/controllers/reflection.controller.ts`

**Update:**
- `src/routes/reflection.routes.ts`

---

## 📚 Documentation Quick Links

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **BUILD_STATUS.md** | Complete build info | Check what's done |
| **QUICKSTART.md** | This file | Start server & test |
| **QUICK_REFERENCE.md** | API reference | During development |
| **IMPLEMENTATION_GUIDE.md** | How to implement | Adding features |
| **START_HERE.md** | Full overview | First time setup |
| **EXECUTION_STEPS.md** | Detailed steps | Troubleshooting |

---

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error:** `Failed to connect to MongoDB`

**Solutions:**
1. Start local MongoDB: `net start MongoDB`
2. OR use MongoDB Atlas:
   - Update `.env`: `MONGODB_URI=mongodb+srv://...`
3. Check MongoDB is installed: `mongosh --version`

---

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solutions:**
1. Change port in `.env`: `PORT=5001`
2. OR kill process:
   ```cmd
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

---

### Module Not Found

**Error:** `Cannot find module '...'`

**Solution:**
```cmd
npm install
```

---

## 💡 Pro Tips

1. **Keep server running** - It auto-reloads on file changes (nodemon)
2. **Check console** - All errors are logged there
3. **Use Postman** - Much easier than curl for testing
4. **Test as you go** - Test each new endpoint immediately
5. **Follow guides** - `IMPLEMENTATION_GUIDE.md` has all templates

---

## 🎯 Success Checklist

- [ ] MongoDB running
- [ ] Server started (`start-dev.bat`)
- [ ] Health check passes
- [ ] User registration works
- [ ] User login works
- [ ] Profile retrieval works
- [ ] Ready to implement features!

---

## 🚀 You're All Set!

Your Life Compass backend is:
- ✅ Built
- ✅ Configured
- ✅ Documented
- ✅ Ready to extend

**Just start the server and begin testing!**

Questions? Check **BUILD_STATUS.md** or **QUICK_REFERENCE.md**

Happy coding! 🎊

---

**Build:** Complete ✅  
**Status:** Ready to Run 🚀  
**Next:** Start server → Test → Implement features
