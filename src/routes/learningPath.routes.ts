import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

// TODO: Implement learning path routes
router.get('/', (req, res) => {
  res.json({ message: 'Learning paths endpoint - coming soon' });
});

export default router;
