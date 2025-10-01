import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";

export class CustomerController {
  constructor(private customerService: CustomerService) {}

  list = async (req: Request, res: Response) => {
    try {
      const customers = await this.customerService.list();
      res.status(200).json(customers);
    } catch (err) {
      console.error("Failed to list in-progress customers:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
