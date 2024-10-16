import {Handler} from 'express';

export const requestLogger: Handler = (req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
