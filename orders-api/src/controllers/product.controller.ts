/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { CreateProductSchema } from "../dtos/product.dto";

export class ProductController {
  constructor(private productService: ProductService) {}

  create = async (req: Request, res: Response) => {
    try {
      const productDto = CreateProductSchema.parse(req.body);

      const product = await this.productService.create(productDto);

      res.status(201).json(product);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const product = await this.productService.getById(id);
      if (!product) {
        return res.status(404).json({ message: "product not found" });
      }

      res.status(200).json(product);
    } catch (err: any) {
      console.error("Failed to get product by ID:", err);
      res.status(500).json({ message: err.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const updateData = req.body;
      const updatedProduct = await this.productService.update(id, updateData);

      res.status(200).json(updatedProduct);
    } catch (err: any) {
      console.error("Failed to update product:", err);
      res.status(500).json({ message: err.message });
    }
  };

  softDelete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      await this.productService.softDelete(id);
      res.status(204).send();
    } catch (err: any) {
      console.error("Failed to soft delete product:", err);
      res.status(500).json({ message: err.message });
    }
  };

  list = async (req: Request, res: Response) => {
    try {
      const { search = "", cursor, limit = "10" } = req.query;

      const result = await this.productService.search({
        search: String(search),
        cursor: cursor ? parseInt(cursor as string, 10) : undefined,
        limit: parseInt(limit as string, 10),
      });

      res.status(200).json(result);
    } catch (err: any) {
      console.error("Failed to search products:", err);
      res.status(500).json({ message: err.message });
    }
  };
}
