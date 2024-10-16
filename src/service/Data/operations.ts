import raw from '../../../data/sdei.json';

type RawDataFrame = (typeof raw)[number];
type DataFrame = RawDataFrame & {id: number};

const map: Record<number, DataFrame | null> = {};
const data: DataFrame[] = [];

export const initialize = () => {
  if (data.length === 0) {
    data.push(...raw.map((d, id) => (map[id] = {id, ...d})));
  }
};

export const getAll = () => {
  return data;
};

export const getById = (id: number) => {
  return map[id] || null;
};
