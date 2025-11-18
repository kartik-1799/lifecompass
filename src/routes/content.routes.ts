import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import * as contentController from '../controllers/content.controller';

const router = Router();

router.use(authenticate);

router.post('/', contentController.create);
router.get('/', contentController.getAll);
router.get('/category/:category', contentController.getByCategory);
router.get('/type/:type', contentController.getByType);
router.get('/:id', contentController.getById);
router.put('/:id', contentController.update);
router.delete('/:id', contentController.remove);
router.post('/:id/like', contentController.like);
router.post('/:id/complete', contentController.complete);

export default router;
