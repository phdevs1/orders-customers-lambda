import { AppDataSource } from "../db/conexion";
import {
  CreateProductDto,
  GetProductDto,
  GetProductSchema,
  UpdateProductDto,
} from "../dtos/product.dto";
import { Product } from "../entities/Product";

export class ProductRepository {
  private productRepository = AppDataSource.getRepository(Product);

  async create(data: CreateProductDto): Promise<GetProductDto> {
    const newProduct = this.productRepository.create(data);
    return this.productRepository.save(newProduct);
  }

  async getById(id: number): Promise<GetProductDto | null> {
    return this.productRepository.findOneBy({ id });
  }

  async update(id: number, data: UpdateProductDto): Promise<GetProductDto> {
    await this.productRepository.update(id, data);

    const updatedProduct = await this.productRepository.findOneBy({ id });

    if (!updatedProduct) {
      throw new Error("Product not found after update");
    }

    return GetProductSchema.parse(updatedProduct);
  }

  async softDelete(id: number): Promise<void> {
    await this.productRepository.softDelete(id);
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async search(params: { search: string; cursor?: number; limit: number }) {
    const { search, cursor, limit } = params;

    const qb = this.productRepository
      .createQueryBuilder("product")
      .where("product.deletedAt IS NULL");

    if (search) {
      qb.andWhere("(product.name ILIKE :search OR product.sku ILIKE :search)", {
        search: `%${search}%`,
      });
    }

    if (cursor) {
      qb.andWhere("product.id > :cursor", { cursor });
    }

    qb.orderBy("product.id", "ASC").limit(limit + 1);

    const products = await qb.getMany();
    const hasNextPage = products.length > limit;
    const items = products.slice(0, limit);
    const nextCursor = hasNextPage ? items[items.length - 1].id : null;

    return {
      data: items,
      nextCursor,
    };
  }
}
