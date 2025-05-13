import { Router } from "express";
import { getChatbotResponse } from "./financeController";


const financeRouter = Router();

financeRouter.get("/chat", getChatbotResponse);


export default financeRouter