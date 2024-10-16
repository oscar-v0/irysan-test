import express from 'express';
import z from 'zod';
import ApiError from '../common/ApiError';
import Data from '../service/Data';

export default express
  .Router()
  .get('/', (req, res) => {
    res.json(Data.getAll());
  })
  .get('/:id', (req, res) => {
    const {id} = z.object({id: z.coerce.number()}).parse(req.params);
    const item = Data.getById(id);

    res.json(ApiError.ifNull(item, {status: 404, message: 'Not found'}));
  });
