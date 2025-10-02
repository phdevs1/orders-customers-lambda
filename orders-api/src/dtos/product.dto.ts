import { z } from "zod";

export const CreateProductSchema = z.object({
  sku: z.string(),
  name: z.string(),
  price: z.number().min(0),
  stock: z.number().min(0),
});
export type CreateProductDto = z.infer<typeof CreateProductSchema>;

export const GetProductSchema = z.object({
  id: z.number(),
  sku: z.string(),
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  createdAt: z.date(),
});
export type GetProductDto = z.infer<typeof GetProductSchema>;

export const UpdateProductSchema = CreateProductSchema.partial();
export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;
