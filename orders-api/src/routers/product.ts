import { Router } from "express";
import { ProductRepository } from "../repositories/product.repository";
import { ProductService } from "../services/product.service";
import { ProductController } from "../controllers/product.controller";

const productRouter = Router();

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

productRouter.post("/", productController.create);
productRouter.get("/", productController.list);
productRouter.get("/:id", productController.getById);
productRouter.put("/:id", productController.update);
productRouter.delete("/:id", productController.softDelete);

export default productRouter;
