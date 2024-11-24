import { Router } from "express";
import {
  createOrderController,
  getOrderController,
  updateOrderController,
  deleteOrderController,
  listOrdersController,
} from "../controllers/ordersController";
import { z } from "zod";
import { OrderStatus } from "../../../../models/orders";
import { validateRequest } from "../../../middlewares/validation";

const router = Router();

const createOrderSchema = z.object({
  tableNumber: z.number().int().positive({ message: 'Table number must be a positive integer' }),
  customer: z.string().nonempty({ message: 'Customer name is required' }),
  status: z.nativeEnum(OrderStatus, { errorMap: () => ({ message: `Invalid order status, must be one of: ${Object.values(OrderStatus).join(', ')}` }) }),
  waiterId: z.string().uuid({ message: 'Waiter ID must be a valid UUID' }),
});

const updateOrderSchema = z.object({
  tableNumber: z.number().int().positive({ message: 'Table number must be a positive integer' }).optional(),
  customer: z.string().optional(),
  status: z.nativeEnum(OrderStatus, { errorMap: () => ({ message: `Invalid order status, must be one of: ${Object.values(OrderStatus).join(', ')}` }) }).optional(),
  waiterId: z.string().uuid({ message: 'Waiter ID must be a valid UUID' }).optional(),
});

router.post("/", validateRequest(createOrderSchema), createOrderController);
router.get("/", listOrdersController);
router.get("/:id", getOrderController);
router.put("/:id", validateRequest(updateOrderSchema), updateOrderController);
router.delete("/:id", deleteOrderController);

export default router;