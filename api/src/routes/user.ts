import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { db } from '../db';
import { InsertUser, usersTable } from '../db/schema';

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

  const user: InsertUser = {
    name: req.body.name,
  };

  await db.insert(usersTable).values(user)

  res.status(201).json(user)
});

router.get('/', async (req: Request, res: Response) => {
  const result = await db.query.usersTable.findMany({});

  res.json({ users: result })
})

export default router;