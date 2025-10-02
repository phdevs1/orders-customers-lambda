import { Router } from "express";
import healthRouter from "./health";
import productRouter from "./product";

// Rutas
const router = Router();

router.use("/health", healthRouter);
router.use("/products", productRouter);

export default router;
