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

/**
 * @swagger
 * /api/v1/education/quiz:
 *   get:
 *     tags:
 *       - Finance Education - Quizzes
 *     summary: Get all quizzes
 *     description: Retrieve a list of all available finance education quizzes
 *     security: []
 *     parameters:
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: ['beginner', 'intermediate', 'advanced']
 *         description: Filter quizzes by difficulty level
 *         example: 'beginner'
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter quizzes by category
 *         example: 'Trading'
 *     responses:
 *       200:
 *         description: Quizzes retrieved successfully
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
 *                   example: 'Quizzes retrieved successfully'
 *                 data:
 *                   type: object
 *                   properties:
 *                     quizzes:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Quiz'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/', getQuizzes);
router.get('/:id',validateRequest(quizIdParamSchema, "params"), getQuizById as RequestHandler);
router.post('/',validateRequest(createQuizSchema), createQuiz);
router.patch('/:id',
  validateRequest(quizIdParamSchema, "params"),
  validateRequest(updateQuizSchema as any), updateQuiz);
router.delete('/:id',validateRequest(quizIdParamSchema, "params"), deleteQuiz);
/**
 * @swagger
 * /api/v1/education/quiz/{id}/submit:
 *   post:
 *     tags:
 *       - Finance Education - Quizzes
 *     summary: Submit quiz answers
 *     description: Submit answers for a quiz and get results with score
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Quiz ID
 *         example: '507f1f77bcf86cd799439011'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answers
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                       example: '507f1f77bcf86cd799439012'
 *                     selectedAnswer:
 *                       type: number
 *                       example: 1
 *                 example:
 *                   - questionId: '507f1f77bcf86cd799439012'
 *                     selectedAnswer: 1
 *                   - questionId: '507f1f77bcf86cd799439013'
 *                     selectedAnswer: 2
 *     responses:
 *       200:
 *         description: Quiz submitted successfully
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
 *                   example: 'Quiz submitted successfully'
 *                 data:
 *                   type: object
 *                   properties:
 *                     score:
 *                       type: number
 *                       example: 85
 *                     totalQuestions:
 *                       type: number
 *                       example: 10
 *                     correctAnswers:
 *                       type: number
 *                       example: 8
 *                     results:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           questionId:
 *                             type: string
 *                           correct:
 *                             type: boolean
 *                           selectedAnswer:
 *                             type: number
 *                           correctAnswer:
 *                             type: number
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/:id/submit',validateRequest(quizIdParamSchema, "params"),
  validateRequest(submitQuizSchema), submitQuiz as RequestHandler);

export default router;
