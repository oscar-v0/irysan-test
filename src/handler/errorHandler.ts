import {ErrorRequestHandler} from 'express';
import {ZodError} from 'zod';
import ApiError from '../common/ApiError';

const createApiError = (e: any) => {
  if (e instanceof ApiError) {
    return e;
  }

  if (e instanceof ZodError) {
    return new ApiError({
      status: 400,
      message: `${e.issues[0].path}: ${e.issues[0].message}`,
    });
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
