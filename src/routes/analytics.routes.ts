import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import * as analyticsController from '../controllers/analytics.controller';

const router = Router();

router.use(authenticate);

router.get('/user', analyticsController.getUserAnalytics);
router.get('/system', analyticsController.getSystemAnalytics);

export default router;
