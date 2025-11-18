import { Router } from 'express';
import { body } from 'express-validator';
import * as userController from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';

const router = Router();

router.use(authenticate);

const updateProfileValidation = [
  body('firstName').optional().trim().isLength({ min: 2 }),
  body('lastName').optional().trim().isLength({ min: 2 }),
  body('profile.bio').optional().isString(),
  body('profile.interests').optional().isArray(),
  body('profile.goals').optional().isArray(),
];

const updatePreferencesValidation = [
  body('theme').optional().isIn(['light', 'dark']),
  body('notifications').optional().isBoolean(),
  body('language').optional().isString(),
];

router.get('/profile', userController.getProfile);
router.put('/profile', validate(updateProfileValidation), userController.updateProfile);
router.put('/preferences', validate(updatePreferencesValidation), userController.updatePreferences);

export default router;
