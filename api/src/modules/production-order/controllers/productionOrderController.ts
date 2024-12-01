import { Request, Response } from 'express';
import {
  createProductionOrderService,
  getProductionOrderByIdService,
  updateProductionOrderService,
  deleteProductionOrderService,
  listProductionOrdersService,
  listProductionOrdersByStatusService,
  markAsDeliveredService,
} from '../services/productionOrderService';
import { ProductionOrderStatus } from '../../../../models/production-order';

export const createProductionOrderController = async (req: Request, res: Response) => {
  try {
    const productionOrders = await createProductionOrderService(req.body);
    res.status(201).json(productionOrders);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getProductionOrderController = async (req: Request, res: Response) => {
  try {
    const productionOrder = await getProductionOrderByIdService(req.params.id);
    res.status(200).json(productionOrder);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const updateProductionOrderController = async (req: Request, res: Response) => {
  try {
    const productionOrder = await updateProductionOrderService(req.params.id, req.body);
    res.status(200).json(productionOrder);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteProductionOrderController = async (req: Request, res: Response) => {
  try {
    await deleteProductionOrderService(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const listProductionOrdersController = async (_req: Request, res: Response) => {
  try {
    const productionOrders = await listProductionOrdersService();
    res.status(200).json(productionOrders);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const listProductionOrdersByStatusController = async (req: Request, res: Response) => {
  try {
    const productionOrders = await listProductionOrdersByStatusService(req.params.status as ProductionOrderStatus);
    res.status(200).json(productionOrders);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const markAsDeliveredController = async (req: Request, res: Response) => {
  try {
    await markAsDeliveredService(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};
