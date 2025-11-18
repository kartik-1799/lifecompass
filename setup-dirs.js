const fs = require('fs');
const path = require('path');

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
    console.log(`Created: ${dir}`);
  }
});

// Create .gitkeep for uploads
fs.writeFileSync(path.join(__dirname, 'uploads', '.gitkeep'), '');

console.log('✅ Directory structure created successfully!');
