import express, { Request, Response } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import globalErrorHandler from './middleware/globalErrorHandler';
import passport from 'passport';
import passportConfig from './config/passport';
import { 
  helmetConfig, 
  generalRateLimit, 
  authRateLimit, 
  getCorsConfig, 
  additionalSecurityHeaders 
} from './config/security';
import authRouter from './auth/authRoute';
import newsRouter from './FinanceNews/newsRoute';
import currencyRouter from './CurrecncyConvertor/currencyRoutes';
import financeRouter from './FinanceChatbot/financeRoute';
import gamificationRoute from './FinanceEducation/gamificationRoute';
import lessonRoute from './FinanceEducation/lessonRoute';
import quizRoute from './FinanceEducation/quizRoute';
import flashcardRoute from './FinanceEducation/flashcardRoute';
import learningPathRoute from './FinanceEducation/learningPathRoute';
import skillChallengeRoute from './FinanceEducation/skillChallengeRoute';
import userStatsRoute from './FinanceEducation/userStatsRoute';
import rewardRoute from './FinanceEducation/rewardRoute';

config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});


app.use(helmetConfig);
app.use(additionalSecurityHeaders);
app.use(generalRateLimit);

app.use(cors(getCorsConfig()));

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
passportConfig(passport);

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Finance App Express Backend',
    documentation: '/api-docs',
  });
});

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'FinTechForge API Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
  },
}));

app.use('/api/v1/auth', authRateLimit, authRouter);
app.use('/api/v1/news', newsRouter);
app.use('/api/v1/currency', currencyRouter);
app.use('/api/v1/financechatbot', financeRouter);

app.use('/api/v1/education/lesson', lessonRoute);
app.use('/api/v1/education/quiz', quizRoute);
app.use('/api/v1/education/flashcard', flashcardRoute);
app.use('/api/v1/education/learning-path', learningPathRoute);
app.use('/api/v1/education/skill-challenge', skillChallengeRoute);
app.use('/api/v1/education/reward', rewardRoute);
app.use('/api/v1/education/gamification', gamificationRoute);
app.use('/api/v1/education/stats', userStatsRoute);
app.use(globalErrorHandler);

export { server, io };
