import express, { NextFunction, Request, Response } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import globalErrorHandler from '../backend-node/src/middleware/globalErrorHandler';
import passport from 'passport'
import passportConfig from '../backend-node/src/config/passport';
import authRouter from '../backend-node/src/auth/authRoute';
import newsRouter from '../backend-node/src/FinanceNews/newsRoute';
import currencyRouter from '../backend-node/src/CurrecncyConvertor/currencyRoutes';
import { getChatbotResponse } from '../backend-node/src/FinanceChatbot/financeController';

import React from 'react';
import FinancialHealthScore from './components/FinancialHealthScore/FinancialHealthScore';

function App() {
  return (
    <div>
      <FinancialHealthScore />
    </div>
  );
}

export default App;


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
  app.use(globalErrorHandler);

export { server, io };
