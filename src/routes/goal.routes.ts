import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

// TODO: Implement goal routes
router.get('/', (req, res) => {
  res.json({ message: 'Goals endpoint - coming soon' });
});

export default router;
