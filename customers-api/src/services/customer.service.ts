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

  search = async (params: {
    search: string;
    cursor?: number;
    limit: number;
  }) => {
    return await this.customerRepository.search(params);
  };
}
