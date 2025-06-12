import { Router } from "express";
import { convertCurrency, getAllCurrency } from "./currencyController";
import { convertCurrencyQuerySchema } from "../validator/currencyValidator";
import { validateRequest } from "../middleware/validateRequest";

const currencyRouter = Router();

currencyRouter.get("/getallcurrency", getAllCurrency);
currencyRouter.get(
  "/convertcurrency",
  validateRequest(convertCurrencyQuerySchema, "query"),
  convertCurrency
);

export default currencyRouter;