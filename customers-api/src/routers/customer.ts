import { Router } from "express";
import { CustomerController } from "../controllers/customer.controller";
import { CustomerService } from "../services/customer.service";
import { CustomerRepository } from "../repositories/customer.repository";

const customerRouter = Router();

const customerRepository = new CustomerRepository();
const customerService = new CustomerService(customerRepository);
const customerController = new CustomerController(customerService);

customerRouter.post("/", customerController.create);
customerRouter.get("/", customerController.list);
customerRouter.get("/:id", customerController.getById);
customerRouter.put("/:id", customerController.update);
customerRouter.delete("/:id", customerController.softDelete);

export default customerRouter;
