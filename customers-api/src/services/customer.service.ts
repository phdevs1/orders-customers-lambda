import { CustomerRepository } from "../repositories/customer.repository";
import { CustomerDto, CustomerSchema } from "../dtos/customer.dto";

export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  list = async (): Promise<CustomerDto[]> => {
    const customers = await this.customerRepository.list();
    return CustomerSchema.array().parse(customers);
  };
}
