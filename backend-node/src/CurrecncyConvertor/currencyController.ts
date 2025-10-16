import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

const getAllCurrency = async (req: Request, res: Response, next: NextFunction) => {
    if (!process.env.RAPID_API_KEY) {
      return next(createHttpError(500, 'RapidAPI key is not configured'));
    }

    const options = {
        method: 'GET',
        url: 'https://currency-convertor-api.p.rapidapi.com/currency',
        headers: {
          'x-rapidapi-key': process.env.RAPID_API_KEY,
          'x-rapidapi-host': 'currency-convertor-api.p.rapidapi.com'
        }
      };

    try {

      const response = await axios.request(options);

     
        res.status(200).json({
            status: 'success', data: response.data
        });
		
    } catch (err) {
      console.log(err);
      return next(createHttpError(500, 'Error while processing your request'));
    }
  };


  const convertCurrency = async (req: Request, res: Response, next: NextFunction) => {
    if (!process.env.RAPID_API_KEY) {
      return next(createHttpError(500, 'RapidAPI key is not configured'));
    }

    const {amount, from , to} = req.query;

    const options = {
        method: 'GET',
        url: `https://currency-convertor-api.p.rapidapi.com/convert/${amount}/${from}/${to}`,
        headers: {
          'x-rapidapi-key': process.env.RAPID_API_KEY ,
          'x-rapidapi-host': 'currency-convertor-api.p.rapidapi.com'
        }
      };

    try {

      const response = await axios.request(options);

     
        res.status(200).json({
            status: 'success', data: response.data
        });
		
    } catch (err) {
      console.log(err);
      return next(createHttpError(500, 'Error while processing your request'));
    }
  };



export {getAllCurrency, convertCurrency}