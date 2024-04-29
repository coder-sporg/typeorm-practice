import { AppDataSource } from "./data-source";
import { Department } from "./entity/Department";
import { Employee } from "./entity/Employee";

AppDataSource.initialize()
  .then(async () => {
    const d1 = new Department();
    d1.name = "技术部";

    const e1 = new Employee();
    e1.name = "张三";

    const e2 = new Employee();
    e2.name = "李四";

    const e3 = new Employee();
    e3.name = "王五";

    // 级联添加
    d1.employees = [e1, e2, e3];

    await AppDataSource.manager.save(Department, d1); // 级联添加
    // await AppDataSource.manager.save(Employee, [e1, e2, e3]);

    const deps1 = await AppDataSource.manager.find(Department, {
      relations: {
        employees: true,
      },
    });
    console.log("deps1", deps1);

    const deps2 = await AppDataSource.manager
      .getRepository(Department)
      .createQueryBuilder("d")
      .leftJoinAndSelect("d.employees", "e")
      .getMany();
    console.log("deps2: ", deps2);

    // const deps3 = await AppDataSource.manager
    //   .createQueryBuilder(Department, "d")
    //   .leftJoinAndSelect("d.employees", "e")
    //   .getMany();
    // console.log("deps3: ", deps3);

    // 删除
    // 1. 普通删除
    // const employees = await AppDataSource.manager.find(Employee)
    // console.log('employees: ', employees);
    // // await AppDataSource.manager.remove(Employee, employees) // DELETE FROM `employee` WHERE (`id` = ? OR `id` = ? OR `id` = ?) -- PARAMETERS: [1,2,3]
    // await AppDataSource.manager.delete(Employee, employees) // DELETE FROM `employee` WHERE `id` IN (?, ?, ?) -- PARAMETERS: [4,5,6]
    // await AppDataSource.manager.delete(Department, 1);

    // 2. 级联删除
    await AppDataSource.manager.delete(Department, [d1.id]); // 级联删除

    const deps3 = await AppDataSource.manager
      .createQueryBuilder(Department, "d")
      .leftJoinAndSelect("d.employees", "e")
      .getMany();
    console.log("deps3: ", deps3);
  })
  .catch((error) => console.log(error));
