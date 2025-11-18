import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

// TODO: Implement reflection routes
router.get('/', (req, res) => {
  res.json({ message: 'Reflections endpoint - coming soon' });
});

export default router;
