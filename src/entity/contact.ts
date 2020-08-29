import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from "typeorm";

@Entity("contacts")
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: String;

  @Column("text")
  name: string;

  @Column("text")
  mobile: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
