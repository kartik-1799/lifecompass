import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

// TODO: Implement content routes
router.get('/', (req, res) => {
  res.json({ message: 'Content endpoint - coming soon' });
});

export default router;
