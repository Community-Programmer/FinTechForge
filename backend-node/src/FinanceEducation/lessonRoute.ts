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

/**
 * @swagger
 * /api/v1/education/lesson:
 *   get:
 *     tags:
 *       - Finance Education - Lessons
 *     summary: Get all lessons
 *     description: Retrieve a list of all available finance education lessons
 *     security: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter lessons by category
 *         example: 'Trading'
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: ['beginner', 'intermediate', 'advanced']
 *         description: Filter lessons by difficulty level
 *         example: 'beginner'
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of lessons to retrieve
 *         example: 20
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of lessons to skip
 *         example: 0
 *     responses:
 *       200:
 *         description: Lessons retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 'Lessons retrieved successfully'
 *                 data:
 *                   type: object
 *                   properties:
 *                     lessons:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Lesson'
 *                     totalCount:
 *                       type: integer
 *                       example: 25
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/', getLessons);
/**
 * @swagger
 * /api/v1/education/lesson/{id}:
 *   get:
 *     tags:
 *       - Finance Education - Lessons
 *     summary: Get lesson by ID
 *     description: Retrieve a specific lesson with detailed content
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Lesson ID
 *         example: '507f1f77bcf86cd799439011'
 *     responses:
 *       200:
 *         description: Lesson retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 'Lesson retrieved successfully'
 *                 data:
 *                   type: object
 *                   properties:
 *                     lesson:
 *                       $ref: '#/components/schemas/Lesson'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/:id',validateRequest(lessonIdParamSchema, "params"), getLessonById as RequestHandler);
router.post('/',  validateRequest(createLessonSchema),createLesson);
router.patch('/:id',validateRequest(lessonIdParamSchema, "params"),
  validateRequest(updateLessonSchema as any), updateLesson);
router.delete('/:id',validateRequest(lessonIdParamSchema, "params"), deleteLesson);

export default router;
