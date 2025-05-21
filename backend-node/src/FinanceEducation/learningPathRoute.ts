import { RequestHandler, Router } from 'express';
import {
  getLearningPaths,
  getLearningPathById,
  createLearningPath,
  updateLearningPath,
  deleteLearningPath
} from './learningPathController.js';

const router = Router();

router.get('/', getLearningPaths);
router.get('/:id', getLearningPathById as RequestHandler);
router.post('/', createLearningPath);
router.patch('/:id', updateLearningPath);
router.delete('/:id', deleteLearningPath);

export default router; 