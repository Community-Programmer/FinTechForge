import { RequestHandler, Router } from 'express';
import {
  getLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} from './lessonController';
import {
  lessonIdParamSchema,
  createLessonSchema,
  updateLessonSchema,
} from '../validator/lessonValidator';
import { validateRequest } from '../middleware/validateRequest';


const router = Router();

router.get('/', getLessons);
router.get('/:id',validateRequest(lessonIdParamSchema, "params"), getLessonById as RequestHandler);
router.post('/',  validateRequest(createLessonSchema),createLesson);
router.patch('/:id',validateRequest(lessonIdParamSchema, "params"),
  validateRequest(updateLessonSchema as any), updateLesson);
router.delete('/:id',validateRequest(lessonIdParamSchema, "params"), deleteLesson);

export default router;
