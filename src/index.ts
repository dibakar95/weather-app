import 'dotenv/config';
import express from 'express';

const port = process.env.PORT || 3000;
import apiRouter from './api/routes';

const app = express();

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
