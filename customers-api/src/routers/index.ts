import { Router } from "express";
import healthRouter from "./health";
import customerRouter from "./customer";

// Rutas
const router = Router();

router.use("/health", healthRouter);

router.use("/customers", customerRouter);

export default router;
