import { Request, Response } from "express";

import {
  createOrderService,
  getOrderByIdService,
  updateOrderService,
  deleteOrderService,
  listOrdersService,
} from "../services/orderService";

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const order = await createOrderService(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const getOrderController = async (req: Request, res: Response) => {
  try {
    const order = await getOrderByIdService(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const updateOrderController = async (req: Request, res: Response) => {
  try {
    const order = await updateOrderService(req.params.id, req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const deleteOrderController = async (req: Request, res: Response) => {
  try {
    await deleteOrderService(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const listOrdersController = async (_req: Request, res: Response) => {
  try {
    const orders = await listOrdersService();
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};