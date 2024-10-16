import express from 'express';
import ApiError from '../common/ApiError';
import {DataDto} from '../dto';
import Data from '../service/Data';

export default express
  .Router()
  .get('/', (_, res) => {
    res.json(Data.getAll());
  })
  .get('/filter', async (req, res) => {
    res.json(await Data.getMany(DataDto.GetManyParams.parse(req.query)));
  })
  .get('/stats', async (_, res) => {
    res.json(await Data.getStats());
  })
  .get('/:id', async (req, res) => {
    res.json(await Data.getById(DataDto.GetByIdParams.parse(req.params)).then(ApiError.notFoundIfNull));
  })
  .post('/', async (req, res) => {
    res.json(await Data.create(DataDto.CreateDataFrameParams.parse(req.body)));
  })
  .delete('/:id', async (req, res) => {
    await Data.remove(DataDto.DeleteDataFrameParams.parse(req.params)).then(ApiError.notFoundIfNull);
    res.status(204).end();
  });
