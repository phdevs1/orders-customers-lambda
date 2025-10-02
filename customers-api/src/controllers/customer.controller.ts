import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";
import { CreateCustomerSchema } from "../dtos/customer.dto";

export class CustomerController {
  constructor(private customerService: CustomerService) {}

  create = async (req: Request, res: Response) => {
    try {
      const customerDto = CreateCustomerSchema.parse(req.body);

      const customer = await this.customerService.create(customerDto);
      res.status(201).json(customer);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid customer ID" });
      }

      const customer = await this.customerService.getById(id);
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      res.status(200).json(customer);
    } catch (err: any) {
      console.error("Failed to get customer by ID:", err);
      res.status(500).json({ message: err.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid customer ID" });
      }

      const updateData = req.body;
      await this.customerService.update(id, updateData);
      res.status(204).send();
    } catch (err: any) {
      console.error("Failed to update customer:", err);
      res.status(500).json({ message: err.message });
    }
  };

  softDelete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid customer ID" });
      }

      await this.customerService.softDelete(id);
      res.status(204).send();
    } catch (err: any) {
      console.error("Failed to soft delete customer:", err);
      res.status(500).json({ message: err.message });
    }
  };

  list = async (req: Request, res: Response) => {
    try {
      const { search = "", cursor, limit = "10" } = req.query;

      const result = await this.customerService.search({
        search: String(search),
        cursor: cursor ? parseInt(cursor as string, 10) : undefined,
        limit: parseInt(limit as string, 10),
      });

      res.status(200).json(result);
    } catch (err: any) {
      console.error("Failed to search customers:", err);
      res.status(500).json({ message: err.message });
    }
  };
}
