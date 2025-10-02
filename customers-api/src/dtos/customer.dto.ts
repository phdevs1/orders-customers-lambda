import { z } from "zod";

export const CreateCustomerSchema = z.object({
  name: z.string(),
  email: z.email(),
  phone: z.string().min(6).max(30).optional(),
});

export type CreateCustomerDto = z.infer<typeof CreateCustomerSchema>;

export const GetCustomerSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
  phone: z.string().min(6).max(30).optional(),
  createdAt: z.date(),
});

export type GetCustomerDto = z.infer<typeof GetCustomerSchema>;

export const UpdateCustomerSchema = CreateCustomerSchema.partial();
export type UpdateCustomerDto = z.infer<typeof UpdateCustomerSchema>;
