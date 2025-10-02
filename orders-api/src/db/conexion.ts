import { DataSource } from "typeorm";
import "dotenv/config";
import { Product } from "../entities/Product";
import { Customer } from "../entities/Customer";
import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";
import { IdempotencyKey } from "../entities/IdempotencyKey";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [Product, Customer, Order, OrderItem, IdempotencyKey],
});
