const fs = require('fs');
const path = require('path');

console.log('🔧 Creating Advanced Modules...\n');

// Create directories
const directories = [
  'src/validators',
  'src/dto',
  'src/helpers',
  'src/decorators',
  'src/interceptors',
  'src/filters',
  'src/guards',
  'src/pipes',
  'src/interfaces',
  'src/enums',
  'src/constants',
  'tests',
  'tests/unit',
  'tests/integration',
  'tests/e2e',
  'tests/fixtures',
  'tests/mocks',
  'logs',
  'scripts',
  'docs',
  'docs/api',
  'docs/guides',
  'config',
  'migrations',
  'seeders',
];

directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`  ✓ Created: ${dir}`);
  }
});

console.log('\n✅ Advanced directory structure created!');
console.log('Run: node create-additional-files.js to populate with files');
