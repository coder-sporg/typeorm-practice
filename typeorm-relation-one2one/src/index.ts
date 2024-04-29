import { AppDataSource } from "./data-source";
import { IdCard } from "./entity/IdCard";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    // await createData();

    // await queryData();

    await cascadeCreateData();

    // await cascadeDeleteData();
  })
  .catch((error) => console.log(error));

// 测试不同的场景

// 1. 创建数据
async function createData() {
  const user = new User();
  user.name = "张三";
  user.sex = 1;
  user.age = 25;
  await AppDataSource.manager.save(user);

  const idCard = new IdCard();
  idCard.cardNumber = "11111111";
  idCard.user = user;
  await AppDataSource.manager.save(idCard);

  const users = await AppDataSource.manager.find(User);
  console.log("users: ", users);

  const cards = await AppDataSource.manager.find(IdCard);
  console.log("cards: ", cards);
}

// 2. 查询数据
async function queryData() {
  const user = new User();
  user.id = 2;
  user.name = "李丽";
  user.sex = 0;
  user.age = 22;
  // await AppDataSource.manager.save(user)

  const idCard = new IdCard();
  idCard.id = 2;
  idCard.cardNumber = "22222222";
  idCard.user = user;
  await AppDataSource.manager.save(idCard);

  const users = await AppDataSource.manager.find(User, {
    relations: {
      idCard: true,
    },
  });
  console.log("users: ", users);

  const cards1 = await AppDataSource.manager.find(IdCard, {
    relations: {
      user: true  // 关联 user 信息查询出来
    }
  })
  console.log("cards1: ", cards1);

  const cards2 = await AppDataSource.manager
    .getRepository(IdCard)
    .createQueryBuilder("ic")
    .leftJoinAndSelect("ic.user", "u")
    .getMany();
  console.log("cards2: ", cards2);
}

// 3. 级联创建数据
async function cascadeCreateData() {
  const user = new User();
  user.name = "王五";
  user.sex = 1;
  user.age = 28;

  const idCard = new IdCard();
  idCard.cardNumber = "33333333";
  idCard.user = user;

  user.idCard = idCard;
  await AppDataSource.manager.save(user);

  // 添加 idCard 数据
  const idCard1 = new IdCard();
  idCard1.cardNumber = "44444444";
  const user1 = new User();
  user1.name = "赵六";
  user1.sex = 1;
  user1.age = 23;
  idCard1.user = user1;
  await AppDataSource.manager.save(idCard1);

  const ids = await AppDataSource.manager.find(IdCard, {
    relations: {
      user: true,
    },
  });
  console.log("ids", ids);

  const users = await AppDataSource.manager.find(User, {
    relations: {
      idCard: true,
    },
  });
  console.log("users: ", users);
}

// 4. 级联删除数据
async function cascadeDeleteData() {
  const user = new User();
  user.name = "钱七";
  user.sex = 1;
  user.age = 20;

  const idCard = new IdCard();
  idCard.cardNumber = "55555555";

  user.idCard = idCard;
  await AppDataSource.manager.save(user); // 添加用户

  const ids = await AppDataSource.manager.find(IdCard, {
    relations: {
      user: true,
    },
  });
  console.log("ids", ids);

  await AppDataSource.manager.delete(User, user.id); // 删除 user 表中的数据, 同时会删除 idCard 表中的数据（因为设置了级联操作）
  // await AppDataSource.manager.delete(IdCard, 3);
  // await AppDataSource.manager.remove(idCard)

  const users = await AppDataSource.manager.find(User, {
    relations: {
      idCard: true,
    },
  });
  console.log("users: ", users);
}
