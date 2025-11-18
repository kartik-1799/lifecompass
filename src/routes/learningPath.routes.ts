import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import * as learningPathController from '../controllers/learningPath.controller';

const router = Router();

router.use(authenticate);

router.post('/', learningPathController.create);
router.get('/', learningPathController.getAll);
router.get('/:id', learningPathController.getById);
router.put('/:id', learningPathController.update);
router.delete('/:id', learningPathController.remove);
router.post('/:id/progress', learningPathController.updateProgress);
router.post('/:id/content', learningPathController.addContent);
router.delete('/:id/content/:contentId', learningPathController.removeContent);

export default router;
