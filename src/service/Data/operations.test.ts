import Data from './index';

describe('Unite tests', () => {
  Data.initialize([
    {lat: 0, lon: 0, pm: 0, year: 2000},
    {lat: 10, lon: 10, pm: 2.1, year: 2000},
    {lat: 20, lon: 20, pm: 2.2, year: 2000},
    {lat: 30, lon: 30, pm: 2.3, year: 2000},
    {lat: 40, lon: 40, pm: 2.4, year: 2005},
  ]);

  it('should get all data elements', async () => {
    const data = await Data.getAll();

    expect(data.length).toEqual(5);
    expect(data.map((d) => d.id)).toEqual([0, 1, 2, 3, 4]);
  });

  it('should add a record', async () => {
    const len1 = (await Data.getAll()).length;
    const created = await Data.create({lat: 50, lon: 50, pm: 2.5, year: 2001});
    const len2 = (await Data.getAll()).length;

    expect(len2).toEqual(len1 + 1);
    expect(created.id).toBe(len1);
  });

  it('should filter by year', async () => {
    const filtered = await Data.getMany({year: 2005});

    expect(filtered.length).toEqual(1);
    expect(filtered[0].lat).toEqual(40);
    expect(filtered[0].lon).toEqual(40);
    expect(filtered[0].year).toEqual(2005);
  });
});
