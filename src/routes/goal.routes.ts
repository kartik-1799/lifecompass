import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import * as goalController from '../controllers/goal.controller';

const router = Router();

router.use(authenticate);

router.post('/', goalController.create);
router.get('/', goalController.getAll);
router.get('/:id', goalController.getById);
router.put('/:id', goalController.update);
router.delete('/:id', goalController.remove);
router.post('/:id/milestones', goalController.addMilestone);
router.put('/:id/milestones/:milestoneId', goalController.updateMilestone);
router.post('/:id/milestones/:milestoneId/complete', goalController.completeMilestone);
router.post('/:id/notes', goalController.addNote);
router.post('/:id/link-learning-path', goalController.linkLearningPath);

export default router;
