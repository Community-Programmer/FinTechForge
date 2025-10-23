import { Router } from "express";
import { convertCurrency, getAllCurrency } from "./currencyController";
import { convertCurrencyQuerySchema } from "../validator/currencyValidator";
import { validateRequest } from "../middleware/validateRequest";

const currencyRouter = Router();

/**
 * @swagger
 * /api/v1/currency/getallcurrency:
 *   get:
 *     tags:
 *       - Currency Converter
 *     summary: Get all supported currencies
 *     description: Retrieve a list of all supported currencies with their codes and names
 *     security: []
 *     responses:
 *       200:
 *         description: List of supported currencies retrieved successfully
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
 *                   example: 'Currencies retrieved successfully'
 *                 data:
 *                   type: object
 *                   properties:
 *                     currencies:
 *                       type: object
 *                       additionalProperties:
 *                         type: string
 *                       example:
 *                         USD: 'United States Dollar'
 *                         EUR: 'Euro'
 *                         GBP: 'British Pound Sterling'
 *                         JPY: 'Japanese Yen'
 *                         INR: 'Indian Rupee'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
currencyRouter.get("/getallcurrency", getAllCurrency);
/**
 * @swagger
 * /api/v1/currency/convertcurrency:
 *   get:
 *     tags:
 *       - Currency Converter
 *     summary: Convert currency
 *     description: Convert amount from one currency to another using real-time exchange rates
 *     security: []
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[A-Z]{3}$'
 *         description: Source currency code (3-letter ISO code)
 *         example: 'USD'
 *       - in: query
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[A-Z]{3}$'
 *         description: Target currency code (3-letter ISO code)
 *         example: 'EUR'
 *       - in: query
 *         name: amount
 *         required: true
 *         schema:
 *           type: number
 *           minimum: 0.01
 *         description: Amount to convert
 *         example: 100.50
 *     responses:
 *       200:
 *         description: Currency conversion successful
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
 *                   example: 'Currency converted successfully'
 *                 data:
 *                   $ref: '#/components/schemas/CurrencyConversion'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         description: Currency not supported
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: 'Currency not supported'
 *               errors: ['One or more currency codes are not supported']
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
currencyRouter.get(
  "/convertcurrency",
  validateRequest(convertCurrencyQuerySchema, "query"),
  convertCurrency
);

export default currencyRouter;