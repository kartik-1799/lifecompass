import { body, param } from 'express-validator';

export const createGoalValidation = [
  body('title').trim().notEmpty(),
  body('description').trim().notEmpty(),
  body('category').trim().notEmpty(),
];

export const goalIdValidation = [param('id').isMongoId()];
