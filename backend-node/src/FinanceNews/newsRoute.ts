import { Router } from "express";
import passport from "passport";
import { getAllNews, getNewsSentiment } from "./newsController";
import { newsSentimentQuerySchema } from "../validator/newsValidator";
import { validateRequest } from "../middleware/validateRequest";


const newsRouter = Router();

/**
 * @swagger
 * /api/v1/news/getallnews:
 *   get:
 *     tags:
 *       - Finance News
 *     summary: Get all financial news
 *     description: Retrieve the latest financial news articles from various sources
 *     security: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of articles to retrieve
 *         example: 20
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: ['general', 'stocks', 'crypto', 'forex', 'commodities']
 *         description: Filter news by category
 *         example: 'stocks'
 *     responses:
 *       200:
 *         description: Financial news retrieved successfully
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
 *                   example: 'News retrieved successfully'
 *                 data:
 *                   type: object
 *                   properties:
 *                     articles:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/NewsArticle'
 *                     totalCount:
 *                       type: integer
 *                       example: 150
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
newsRouter.get("/getallnews", getAllNews);
/**
 * @swagger
 * /api/v1/news/getnewssentiment:
 *   get:
 *     tags:
 *       - Finance News
 *     summary: Get news sentiment analysis
 *     description: Analyze sentiment of financial news for specific companies or topics
 *     security: []
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *         description: Company name, stock symbol, or topic to analyze
 *         example: 'AAPL'
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Number of articles to analyze
 *         example: 10
 *       - in: query
 *         name: timeframe
 *         schema:
 *           type: string
 *           enum: ['1d', '7d', '30d']
 *           default: '7d'
 *         description: Time period for news analysis
 *         example: '7d'
 *     responses:
 *       200:
 *         description: News sentiment analysis completed successfully
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
 *                   example: 'Sentiment analysis completed successfully'
 *                 data:
 *                   type: object
 *                   properties:
 *                     query:
 *                       type: string
 *                       example: 'AAPL'
 *                     overallSentiment:
 *                       type: string
 *                       enum: ['positive', 'negative', 'neutral']
 *                       example: 'positive'
 *                     sentimentScore:
 *                       type: number
 *                       minimum: -1
 *                       maximum: 1
 *                       example: 0.65
 *                     articlesAnalyzed:
 *                       type: integer
 *                       example: 10
 *                     sentimentBreakdown:
 *                       type: object
 *                       properties:
 *                         positive:
 *                           type: integer
 *                           example: 6
 *                         negative:
 *                           type: integer
 *                           example: 2
 *                         neutral:
 *                           type: integer
 *                           example: 2
 *                     articles:
 *                       type: array
 *                       items:
 *                         allOf:
 *                           - $ref: '#/components/schemas/NewsArticle'
 *                           - type: object
 *                             properties:
 *                               sentiment:
 *                                 type: string
 *                                 enum: ['positive', 'negative', 'neutral']
 *                                 example: 'positive'
 *                               sentimentScore:
 *                                 type: number
 *                                 minimum: -1
 *                                 maximum: 1
 *                                 example: 0.75
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         description: No news found for the query
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: 'No news found'
 *               errors: ['No articles found for the specified query']
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
newsRouter.get("/getnewssentiment",validateRequest(newsSentimentQuerySchema, "query"), getNewsSentiment);


export default newsRouter;