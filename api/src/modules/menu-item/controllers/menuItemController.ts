import { Request, Response } from 'express';
import {
  createMenuItemService,
  getMenuItemService,
  updateMenuItemService,
  deleteMenuItemService,
  listMenuItemsService,
} from '../services/menuItemService';

export const createMenuItemController = async (req: Request, res: Response) => {
  try {
    const menuItem = await createMenuItemService(req.body);
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMenuItemController = async (req: Request, res: Response) => {
  try {
    const menuItem = await getMenuItemService(req.params.id);
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const updateMenuItemController = async (req: Request, res: Response) => {
  try {
    const menuItem = await updateMenuItemService(req.params.id, req.body);
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteMenuItemController = async (req: Request, res: Response) => {
  try {
    await deleteMenuItemService(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const listMenuItemsController = async (_req: Request, res: Response) => {
  try {
    const menuItems = await listMenuItemsService();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};