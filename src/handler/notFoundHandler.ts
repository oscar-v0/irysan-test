import ApiError from '../common/ApiError';

export const notFoundHandler = () => {
  throw new ApiError({status: 404, message: 'Not found'});
};
