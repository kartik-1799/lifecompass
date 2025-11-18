import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import learningPathRoutes from './learningPath.routes';
import contentRoutes from './content.routes';
import goalRoutes from './goal.routes';
import reflectionRoutes from './reflection.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/learning-paths', learningPathRoutes);
router.use('/content', contentRoutes);
router.use('/goals', goalRoutes);
router.use('/reflections', reflectionRoutes);

export default router;
