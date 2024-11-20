import { Router, Request, Response } from 'express';
import sequelize from '../../db';
import initUser from '../../../models/user';

const User = initUser(sequelize);

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const users = await User.findAll();

  res.json(users);
});

router.get('/:id', async (req: Request, res: Response) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
});

export default router;