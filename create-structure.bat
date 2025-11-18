@echo off
echo Creating directory structure...

mkdir src 2>nul
mkdir src\config 2>nul
mkdir src\models 2>nul
mkdir src\controllers 2>nul
mkdir src\services 2>nul
mkdir src\middlewares 2>nul
mkdir src\routes 2>nul
mkdir src\utils 2>nul
mkdir src\types 2>nul
mkdir uploads 2>nul

echo. > uploads\.gitkeep

echo Directory structure created successfully!
echo.
echo Next steps:
echo 1. Run: npm install
echo 2. Copy .env.example to .env and configure
echo 3. Run the Node.js setup script: node setup-dirs.js
echo 4. Run: npm run dev
pause
