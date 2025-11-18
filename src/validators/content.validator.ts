import { body, param } from 'express-validator';

export const createContentValidation = [
  body('title').trim().notEmpty().isLength({ min: 3, max: 200 }),
  body('description').trim().notEmpty(),
  body('type').isIn(['article', 'video', 'podcast', 'course', 'book']),
];

export const contentIdValidation = [param('id').isMongoId()];
