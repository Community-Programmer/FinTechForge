import { Router } from "express";
import { getChatbotResponse } from "./financeController";
import { getChatbotResponseQuerySchema } from "../validator/financeChatbotValidator";
import { validateRequest } from "../middleware/validateRequest";

const financeRouter = Router();

financeRouter.post("/chat",validateRequest(getChatbotResponseQuerySchema, "query"), getChatbotResponse);


export default financeRouter