import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;
}
