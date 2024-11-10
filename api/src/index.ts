import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import cors from 'cors';
import sequelize from './db';

import signUpRoutes from './routes/public/sign-up';
import loginRoutes from './routes/public/login';
import userRoutes from './routes/private/user'

import authenticateToken from './middleware/auth';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Public routes
app.use('/login', loginRoutes);
app.use('/sign-up', signUpRoutes);

// Private routes
app.use(authenticateToken as RequestHandler);

app.use('/user', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello, TypeScript Express!' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

try {
  sequelize.authenticate().then(() => {
    console.log('Database connected successfully');

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
