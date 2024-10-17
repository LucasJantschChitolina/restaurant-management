import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors'

import userRoutes from './routes/user';

import { db } from './db';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());
app.use('/user', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello, TypeScript Express!' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

db.$client.connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  });