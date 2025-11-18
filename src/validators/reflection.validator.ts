import { body, param } from 'express-validator';

export const createReflectionValidation = [
  body('title').trim().notEmpty(),
  body('content').trim().notEmpty(),
];

export const reflectionIdValidation = [param('id').isMongoId()];
