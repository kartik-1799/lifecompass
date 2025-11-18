import { body, param } from 'express-validator';

export const createLearningPathValidation = [
  body('title').trim().notEmpty().isLength({ min: 3, max: 200 }),
  body('description').trim().notEmpty().isLength({ min: 10, max: 2000 }),
  body('category').trim().notEmpty(),
];

export const updateLearningPathValidation = [
  param('id').isMongoId(),
  body('title').optional().trim().isLength({ min: 3, max: 200 }),
];

export const learningPathIdValidation = [param('id').isMongoId()];
