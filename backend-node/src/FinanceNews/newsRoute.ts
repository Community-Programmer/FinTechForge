import { Router } from "express";
import passport from "passport";
import { getAllNews, getNewsSentiment } from "./newsController";
import { newsSentimentQuerySchema } from "../validator/newsValidator";
import { validateRequest } from "../middleware/validateRequest";


const newsRouter = Router();

newsRouter.get("/getallnews", getAllNews);
newsRouter.get("/getnewssentiment",validateRequest(newsSentimentQuerySchema, "query"), getNewsSentiment);


export default newsRouter;