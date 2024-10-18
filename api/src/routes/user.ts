import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { db } from '../db';
import { User } from '../db/models/user';

const router = Router();

const userValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
];

router.post('/', userValidationRules, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const user = await User.create({
    name: req.body.name,
  })

  res.status(201).json(user)
});

router.get('/', async (req: Request, res: Response) => {
  const result = await User.findAll();

  res.json({ users: result })
})

export default router;