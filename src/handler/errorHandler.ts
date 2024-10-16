import {ErrorRequestHandler} from 'express';
import ApiError from '../common/ApiError';

const createApiError = (e: any) => {
  if (e instanceof ApiError) {
    return e;
  }

  return new ApiError({
    status: 500,
    message: e?.message,
  });
};

export const errorHandler: ErrorRequestHandler = (e, _req, res, _next) => {
  const error = createApiError(e);
  const level = error.status >= 500 && error.status < 600 ? 'error' : 'warn';

  console[level](`[${error.status}] error: ${error.message}`);
  res.status(error.status).json(error.data).end();
};
