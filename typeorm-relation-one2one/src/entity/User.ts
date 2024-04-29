import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { IdCard } from "./IdCard";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    comment: "性别: 0-女, 1-男, 2-未知",
    default: 2, // 默认值
  })
  sex: number;

  @Column()
  age: number;

  // 参数一：关联的表; 参数二: 告诉 typeorm 外键是另一个 Entity 的哪个属性
  @OneToOne(() => IdCard, (idCard) => idCard.user, {
    cascade: ['insert', 'update'],
  })
  idCard: IdCard;
}
