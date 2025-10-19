import { Router } from "express";
import { getChatbotResponse } from "./financeController";
import { getChatbotResponseQuerySchema } from "../validator/financeChatbotValidator";
import { validateRequest } from "../middleware/validateRequest";

const financeRouter = Router();

/**
 * @swagger
 * /api/v1/financechatbot/chat:
 *   post:
 *     tags:
 *       - Finance Chatbot
 *     summary: Get chatbot response
 *     description: Send a financial query to the AI chatbot and receive intelligent responses
 *     security: []
 *     parameters:
 *       - in: query
 *         name: message
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *           maxLength: 1000
 *         description: User's financial question or query
 *         example: 'What is compound interest and how does it work?'
 *       - in: query
 *         name: context
 *         schema:
 *           type: string
 *           maxLength: 500
 *         description: Additional context for the conversation
 *         example: 'I am a beginner investor'
 *     responses:
 *       200:
 *         description: Chatbot response generated successfully
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
 *                   example: 'Response generated successfully'
 *                 data:
 *                   type: object
 *                   properties:
 *                     response:
 *                       type: string
 *                       example: 'Compound interest is the interest calculated on the initial principal and also on the accumulated interest of previous periods. It means you earn interest on your interest, which can significantly boost your investment returns over time...'
 *                     conversationId:
 *                       type: string
 *                       example: '507f1f77bcf86cd799439011'
 *                     timestamp:
 *                       type: string
 *                       format: 'date-time'
 *                       example: '2023-01-01T00:00:00.000Z'
 *                     topics:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ['compound interest', 'investing', 'finance basics']
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       429:
 *         description: Rate limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: 'Rate limit exceeded'
 *               errors: ['Too many requests. Please try again later.']
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
financeRouter.post("/chat",validateRequest(getChatbotResponseQuerySchema, "query"), getChatbotResponse);


export default financeRouter