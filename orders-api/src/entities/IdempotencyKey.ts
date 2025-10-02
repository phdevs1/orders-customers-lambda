import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

export enum TargetType {
  ORDER = "ORDER",
  CUSTOMER = "CUSTOMER",
  PRODUCT = "PRODUCT",
}

@Entity({ name: "idempotency_keys" })
export class IdempotencyKey {
  @PrimaryColumn()
  key: string;

  @Column({
    type: "enum",
    enum: TargetType,
  })
  targetType: TargetType;

  @Column({ name: "target_id", type: "bigint" })
  targetId: number;

  @Column({
    type: "enum",
    enum: ["CREATED", "CONFIRMED", "CANCELED"],
  })
  status: string;

  @Column({ name: "response_body", type: "json" })
  responseBody: any;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @Column({ name: "expires_at", type: "timestamp" })
  expiresAt: Date;
}
