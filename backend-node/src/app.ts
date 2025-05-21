import express, { NextFunction, Request, Response } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import globalErrorHandler from './middleware/globalErrorHandler';
import passport from 'passport';
import passportConfig from './config/passport';
import authRouter from './auth/authRoute';
import newsRouter from './FinanceNews/newsRoute';
import currencyRouter from './CurrecncyConvertor/currencyRoutes';
import { getChatbotResponse } from './FinanceChatbot/financeController';
import gamificationRoute from './FinanceEducation/gamificationRoute';
import lessonRoute from './FinanceEducation/lessonRoute';
import quizRoute from './FinanceEducation/quizRoute';
import flashcardRoute from './FinanceEducation/flashcardRoute';
import learningPathRoute from './FinanceEducation/learningPathRoute';
import skillChallengeRoute from './FinanceEducation/skillChallengeRoute';
import rewardRoute from './FinanceEducation/rewardRoute';

config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
passportConfig(passport);

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Finance App Express Backend',
  });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/news', newsRouter);
app.use('/api/v1/currency', currencyRouter);
app.use('/api/v1/financechatbot', getChatbotResponse);

app.use('/api/v1/education/lesson', lessonRoute);
app.use('/api/v1/education/quiz', quizRoute);
app.use('/api/v1/education/flashcard', flashcardRoute);
app.use('/api/v1/education/learning-path', learningPathRoute);
app.use('/api/v1/education/skill-challenge', skillChallengeRoute);
app.use('/api/v1/education/reward', rewardRoute);
app.use('/api/v1/education/gamification', gamificationRoute);
app.use(globalErrorHandler);

export { server, io };
