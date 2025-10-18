import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { logger } from '../utils/logger';

const getAllCurrency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const options = {
    method: 'GET',
    url: 'https://currency-convertor-api.p.rapidapi.com/currency',
    headers: {
      'x-rapidapi-key': '487da8424bmsh927b3c5b40bb07cp16fa97jsn645356862872',
      'x-rapidapi-host': 'currency-convertor-api.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);

    res.status(200).json({
      status: 'success',
      data: response.data,
    });
  } catch (err) {
    logger.error(err);
    return next(createHttpError(500, 'Error while processing your request'));
  }
};

const convertCurrency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { amount, from, to } = req.query;

  const options = {
    method: 'GET',
    url: `https://currency-convertor-api.p.rapidapi.com/convert/${amount}/${from}/${to}`,
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': 'currency-convertor-api.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);

    res.status(200).json({
      status: 'success',
      data: response.data,
    });
  } catch (err) {
    logger.error(err);
    return next(createHttpError(500, 'Error while processing your request'));
  }
};

export { getAllCurrency, convertCurrency };
