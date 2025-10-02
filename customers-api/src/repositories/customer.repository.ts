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

  async search(params: { search: string; cursor?: number; limit: number }) {
    const { search, cursor, limit } = params;

    const qb = this.customerRepository
      .createQueryBuilder("customer")
      .where("customer.deletedAt IS NULL");

    if (search) {
      qb.andWhere(
        "(customer.name ILIKE :search OR customer.email ILIKE :search)",
        {
          search: `%${search}%`,
        },
      );
    }

    if (cursor) {
      qb.andWhere("customer.id > :cursor", { cursor });
    }

    qb.orderBy("customer.id", "ASC").limit(limit + 1);

    const customers = await qb.getMany();
    const hasNextPage = customers.length > limit;
    const items = customers.slice(0, limit);
    const nextCursor = hasNextPage ? items[items.length - 1].id : null;

    return {
      data: items,
      nextCursor,
    };
  }
}
