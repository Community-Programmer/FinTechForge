import e, { NextFunction, Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import createHttpError from 'http-errors';
import axios from 'axios';

const getChatbotResponse = async (req: Request, res: Response, next: NextFunction) => {

    const { query} = req.query;
    console.log(query);

    try {

      const response = await axios.get(`${process.env.PYTHON_BACKEND_URL}/chatbot/chat`, {
        params: { query }
      });

     
        res.status(200).json({
            status: 'success', message: response.data
        });
		
    } catch (err) {
      console.log(err);
      return next(createHttpError(500, 'Error while processing your request'));
    }
  };


export { getChatbotResponse };