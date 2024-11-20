import { Router } from "express";
import {
  createOrderController,
  getOrderController,
  updateOrderController,
  deleteOrderController,
  listOrdersController,
} from "../controllers/ordersController";

const router = Router();

router.post("/", createOrderController);
router.get("/", listOrdersController);
router.get("/:id", getOrderController);
router.put("/:id", updateOrderController);
router.delete("/:id", deleteOrderController);

export default router;