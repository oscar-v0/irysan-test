import 'express-async-errors';

import raw from '../data/sdei.json';
import app from './app';
import Data from './service/Data';

Data.initialize(raw);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
