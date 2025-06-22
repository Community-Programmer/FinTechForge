import { RequestHandler, Router } from 'express';
import {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
} from './quizController';
import {
  quizIdParamSchema,
  createQuizSchema,
  updateQuizSchema,
  submitQuizSchema,
} from '../validator/quizValidator';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

router.get('/', getQuizzes);
router.get('/:id',validateRequest(quizIdParamSchema, "params"), getQuizById as RequestHandler);
router.post('/',validateRequest(createQuizSchema), createQuiz);
router.patch('/:id',
  validateRequest(quizIdParamSchema, "params"),
  validateRequest(updateQuizSchema as any), updateQuiz);
router.delete('/:id',validateRequest(quizIdParamSchema, "params"), deleteQuiz);
router.post('/:id/submit',validateRequest(quizIdParamSchema, "params"),
  validateRequest(submitQuizSchema), submitQuiz as RequestHandler);

export default router;
