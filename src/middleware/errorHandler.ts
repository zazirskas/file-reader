import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

function errorHandler(err: Error, _req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}

export default errorHandler;
