import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';

const router = Router();
let users: User[] = [
  { id: '1', name: 'Default user' },
  { id: 'asdf', name: 'asdf' }
];

const userValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
];

router.post('/', userValidationRules, (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const user: User = {
    id: String(users.length + 1),
    name: req.body.name,
  };

  users.push(user);
  res.status(201).json(user)
});

router.get('/', (req: Request, res: Response) => {
  res.json({ users })
})

export default router;