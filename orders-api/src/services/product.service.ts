import { ProductRepository } from "../repositories/product.repository";
import {
  CreateProductDto,
  GetProductDto,
  GetProductSchema,
  UpdateProductDto,
} from "../dtos/product.dto";

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  create = async (data: CreateProductDto): Promise<GetProductDto> => {
    return await this.productRepository.create(data);
  };

  getById = async (id: number): Promise<GetProductDto | null> => {
    const customer = await this.productRepository.getById(id);
    if (!customer) {
      return null;
    }
    return GetProductSchema.parse(customer);
  };

  update = async (
    id: number,
    data: UpdateProductDto,
  ): Promise<GetProductDto> => {
    const existingCustomer = await this.productRepository.getById(id);
    if (!existingCustomer) {
      throw new Error("Customer not found");
    }
    return await this.productRepository.update(id, data);
  };

  softDelete = async (id: number): Promise<void> => {
    await this.productRepository.softDelete(id);
  };

  search = async (params: {
    search: string;
    cursor?: number;
    limit: number;
  }) => {
    return await this.productRepository.search(params);
  };
}
