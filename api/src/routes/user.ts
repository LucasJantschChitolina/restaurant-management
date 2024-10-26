import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../db/models/user';

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

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })

  res.status(201).json(user)
});

router.get('/', async (req: Request, res: Response) => {
  const result = await User.findAll();

  res.json({ users: result })
})

export default router;