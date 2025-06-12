import { RequestHandler, Router } from 'express';
import {
  getLearningPaths,
  getLearningPathById,
  createLearningPath,
  updateLearningPath,
  deleteLearningPath,
} from './learningPathController';
import {
  learningPathIdParamSchema,
  createLearningPathSchema,
  updateLearningPathSchema,
} from '../validator/learningPathValidator';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

router.get('/', getLearningPaths);
router.get('/:id',validateRequest(learningPathIdParamSchema, "params"), getLearningPathById as RequestHandler);
router.post('/', validateRequest(createLearningPathSchema), createLearningPath);
router.patch('/:id',   validateRequest(learningPathIdParamSchema, "params"),
  validateRequest(updateLearningPathSchema as any),updateLearningPath);
router.delete('/:id', deleteLearningPath);

export default router;
