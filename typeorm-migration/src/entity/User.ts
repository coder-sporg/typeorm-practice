import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  // @Column() // 注释之后的 sql: ALTER TABLE `user` DROP COLUMN `age`
  // age: number;
}
