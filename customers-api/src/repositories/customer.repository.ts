import { Customer } from "../entities/Customer";
import { AppDataSource } from "../db/conexion";
import {
  CreateCustomerDto,
  GetCustomerDto,
  UpdateCustomerDto,
} from "../dtos/customer.dto";

export class CustomerRepository {
  private customerRepository = AppDataSource.getRepository(Customer);

  async create(data: CreateCustomerDto): Promise<CreateCustomerDto> {
    const newCustomer = this.customerRepository.create(data);
    return this.customerRepository.save(newCustomer);
  }

  async list(): Promise<GetCustomerDto[]> {
    return this.customerRepository.find({});
  }

  async getById(id: number): Promise<GetCustomerDto | null> {
    return this.customerRepository.findOneBy({ id });
  }

  async update(id: number, data: UpdateCustomerDto): Promise<void> {
    await this.customerRepository.update(id, data);
  }

  async softDelete(id: number): Promise<void> {
    await this.customerRepository.softDelete(id);
  }

  async delete(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
