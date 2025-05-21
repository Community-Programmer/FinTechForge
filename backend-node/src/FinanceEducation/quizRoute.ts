import { RequestHandler, Router } from 'express';
import {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz
} from './quizController.js';

const router = Router();

router.get('/', getQuizzes);
router.get('/:id', getQuizById as RequestHandler);
router.post('/', createQuiz);
router.patch('/:id', updateQuiz);
router.delete('/:id', deleteQuiz);
router.post('/:id/submit', submitQuiz as RequestHandler);

export default router; 