import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity({ name: "order_items" })
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "order_id" })
  orderId: number;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Column({ name: "product_id" })
  productId: number;

  @ManyToOne(() => Product, (product) => product.orderItems)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column({ type: "int" })
  qty: number;

  @Column({ name: "unit_price", type: "int" })
  unitPrice: number;

  @Column({ name: "subtotal", type: "int" })
  subtotal: number;
}
