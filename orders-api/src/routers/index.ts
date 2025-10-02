import { Router } from "express";
import healthRouter from "./health";

// Rutas
const router = Router();

router.use("/health", healthRouter);


export default router;
