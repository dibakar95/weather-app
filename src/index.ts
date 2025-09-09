import 'dotenv/config';
import express from 'express';
import apiRouter from './api/routes';

const port = process.env.PORT || 3000;

const app = express();

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
