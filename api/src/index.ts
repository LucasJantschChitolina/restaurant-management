import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import cors from 'cors';
import sequelize from './db';

import signUpRoutes from './modules/auth/routes/sign-up';
import signInRoutes from './modules/auth/routes/sign-in';
import userRoutes from './modules/auth/routes/user';
import menuItemRoutes from './modules/menu-item/routes/menuItem';
import orderRoutes from './modules/order/routes/orders';

import authenticateToken from './middlewares/auth';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Public routes
app.use('/sign-in', signInRoutes);
app.use('/sign-up', signUpRoutes);

// Private routes
app.use(authenticateToken as RequestHandler);

app.use('/user', userRoutes)
app.use('/menu-item', menuItemRoutes);
app.use('/order', orderRoutes);

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
