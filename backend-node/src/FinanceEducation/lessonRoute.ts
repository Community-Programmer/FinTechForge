import { RequestHandler, Router } from 'express';
import {
  getLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} from './lessonController';

const router = Router();

router.get('/', getLessons);
router.get('/:id', getLessonById as RequestHandler);
router.post('/', createLesson);
router.patch('/:id', updateLesson);
router.delete('/:id', deleteLesson);

export default router;
