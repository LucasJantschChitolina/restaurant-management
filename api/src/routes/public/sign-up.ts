import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import sequelize from '../../db';
import initUser from '../../../models/user';
import generateHash from '../../utils/hash';

const User = initUser(sequelize);

const router = Router();

const userValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

router.post('/', userValidationRules, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const alreadyExistsUser = await User.findOne({
    where: {
      email: req.body.email,
    }
  })

  if (alreadyExistsUser) {
    res.status(400).json({ error: 'User already exists' });
    return;
  }

  const hash = generateHash(req.body.password);

  if (!hash) {
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });

  res.status(201).json({ id: user.id, name: user.name, email: user.email });
});

export default router;