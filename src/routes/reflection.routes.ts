import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import * as reflectionController from '../controllers/reflection.controller';

const router = Router();

router.use(authenticate);

router.post('/', reflectionController.create);
router.get('/', reflectionController.getAll);
router.get('/date-range', reflectionController.getByDateRange);
router.get('/mood/:mood', reflectionController.getByMood);
router.get('/:id', reflectionController.getById);
router.put('/:id', reflectionController.update);
router.delete('/:id', reflectionController.remove);
router.post('/:id/insights', reflectionController.addInsight);
router.post('/:id/link-goal', reflectionController.linkGoal);
router.post('/:id/link-content', reflectionController.linkContent);

export default router;
