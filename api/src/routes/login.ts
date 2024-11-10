import { Router, Request, Response } from 'express';
import sequelize from '../db';
import initUser from '../../models/user';
import jwt from 'jsonwebtoken';
import generateHash from '../utils/hash';

const User = initUser(sequelize);

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const hash = generateHash(password);

  if (hash !== user.password) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  res.json(token);
});

export default router;