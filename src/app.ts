import compression from 'compression';
import cors from 'cors';
import express from 'express';
import * as handler from './handler';
import * as router from './router';

const app = express()
  .use(cors({origin: '*'}))
  .use(compression())
  .use(express.urlencoded({extended: true}))
  .use(express.json())
  .use(handler.requestLogger)
  .use('/data', router.data)
  .use(handler.notFoundHandler)
  .use(handler.errorHandler);

export default app;
