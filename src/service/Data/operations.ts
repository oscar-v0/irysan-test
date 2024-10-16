import _ from 'lodash';
import raw from '../../../data/sdei.json';
import {DataDto} from '../../dto';

type RawDataFrame = (typeof raw)[number];
type DataFrame = RawDataFrame & {id: number};

const map: Record<number, DataFrame | null> = {};
const data: DataFrame[] = [];

// ------------------------------------------------------------------------------------------

const getNextId = () => {
  return (data.at(-1)?.id || 0) + 1;
};

// ------------------------------------------------------------------------------------------

export const initialize = () => {
  if (data.length === 0) {
    data.push(...raw.map((d, id) => (map[id] = {id, ...d})));
  }
};

// ------------------------------------------------------------------------------------------

export const getAll = () => {
  return data;
};

export const getById = async ({id}: DataDto.GetByIdParams) => {
  return map[id] || null;
};

export const getMany = async (params: DataDto.GetManyParams = {}) => {
  return data.filter(
    (df) =>
      (params.lat == null || params.lat === df.lat) &&
      (params.lon == null || params.lon === df.lon) &&
      (params.year == null || params.year === df.year),
  );
};

export const getStats = async () => {
  const values = data.map((df) => df.pm);
  return {
    count: values.length,
    average: _.mean(values),
    max: _.max(values),
    min: _.min(values),
  };
};

// ------------------------------------------------------------------------------------------

export const create = async (params: DataDto.CreateDataFrameParams) => {
  const id = getNextId();
  const df = {id, ...params};

  data.push((map[id] = df));
  return df;
};

export const remove = async ({id}: DataDto.DeleteDataFrameParams) => {
  const df = map[id];
  if (!df) {
    return null;
  }

  map[id] = null;
  data.splice(id, 1);

  return df;
};
