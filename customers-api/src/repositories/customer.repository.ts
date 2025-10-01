import { Customer } from "../entities/Customer";
import { AppDataSource } from "../db/conexion";

export class CustomerRepository {
  private customerRepository = AppDataSource.getRepository(Customer);

  async list(): Promise<Customer[]> {
    return this.customerRepository.find({});
  }
}
