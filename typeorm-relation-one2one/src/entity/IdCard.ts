import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({
  name: "id_card",
})
export class IdCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: "身份证号",
  })
  cardNumber: string;

  @OneToOne(() => User, {
    cascade: true, // 添加数据时，自动更新user表 告诉 typeorm 当你增删改一个 Entity 的时候，是否级联增删改它关联的 Entity
    onDelete: "CASCADE", // 级联删除
    onUpdate: "CASCADE", // 级联更新
  })
  @JoinColumn({ // 设置的一方具有外键
    name: "user_id",
  }) // 不仅定义了关系的哪一侧包含带有外键的连接列，还允许自定义连接列名和引用的列名
  user: User
}
