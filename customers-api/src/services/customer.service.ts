import { CustomerRepository } from "../repositories/customer.repository";
import {
  CreateCustomerDto,
  GetCustomerDto,
  GetCustomerSchema,
  UpdateCustomerDto,
} from "../dtos/customer.dto";

export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  create = async (data: CreateCustomerDto): Promise<CreateCustomerDto> => {
    return await this.customerRepository.create(data);
  };

  list = async (): Promise<GetCustomerDto[]> => {
    const customers = await this.customerRepository.list();
    return GetCustomerSchema.array().parse(customers);
  };

  getById = async (id: number): Promise<GetCustomerDto | null> => {
    const customer = await this.customerRepository.getById(id);
    if (!customer) {
      return null;
    }
    return GetCustomerSchema.parse(customer);
  };

  update = async (id: number, data: UpdateCustomerDto): Promise<void> => {
    const existingCustomer = await this.customerRepository.getById(id);
    if (!existingCustomer) {
      throw new Error("Customer not found");
    }
    await this.customerRepository.update(id, data);
  };

  softDelete = async (id: number): Promise<void> => {
    await this.customerRepository.softDelete(id);
  };
}
