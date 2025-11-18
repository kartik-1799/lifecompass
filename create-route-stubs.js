const fs = require('fs');
const path = require('path');

console.log('📋 Creating route stubs...\n');

const stubs = {
  'src/routes/learningPath.routes.ts': `import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

// TODO: Implement learning path routes
router.get('/', (req, res) => {
  res.json({ message: 'Learning paths endpoint - coming soon' });
});

export default router;
`,

  'src/routes/content.routes.ts': `import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

// TODO: Implement content routes
router.get('/', (req, res) => {
  res.json({ message: 'Content endpoint - coming soon' });
});

export default router;
`,

  'src/routes/goal.routes.ts': `import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

// TODO: Implement goal routes
router.get('/', (req, res) => {
  res.json({ message: 'Goals endpoint - coming soon' });
});

export default router;
`,

  'src/routes/reflection.routes.ts': `import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

// TODO: Implement reflection routes
router.get('/', (req, res) => {
  res.json({ message: 'Reflections endpoint - coming soon' });
});

export default router;
`,
};

Object.entries(stubs).forEach(([filePath, content]) => {
  const fullPath = path.join(__dirname, filePath);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, content);
  console.log(`✓ Created: ${filePath}`);
});

console.log('\n✅ Route stubs created!\n');
