import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "./Department";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  // 多的一方使用 @ManyToOne 相关实体将有"关联 id"和外键 departmentId
  @ManyToOne(() => Department, {
    // cascade: true, // 级联保存、更新、删除
    onDelete: "SET NULL", // 设置为空，部门不存在 => 员工不一定不存在
    onUpdate: "CASCADE", // 级联更新
  })
  @JoinColumn({
    name: "d_id", // 外键列名
  })
  department: Department;
}
