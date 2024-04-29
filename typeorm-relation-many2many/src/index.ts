import { AppDataSource } from "./data-source";
import { Article } from "./entity/Article";
import { Tag } from "./entity/Tag";

AppDataSource.initialize()
  .then(async () => {
    const a1 = new Article();
    a1.title = "aaaa";
    a1.content = "aaaaaaaaaa";

    const a2 = new Article();
    a2.title = "bbbbbb";
    a2.content = "bbbbbbbbbb";

    const t1 = new Tag();
    t1.name = "ttt1111";

    const t2 = new Tag();
    t2.name = "ttt2222";

    const t3 = new Tag();
    t3.name = "ttt33333";

    a1.tags = [t1, t2];
    a2.tags = [t1, t2, t3];

    const entityManager = AppDataSource.manager;

    await entityManager.save(t1);
    await entityManager.save(t2);
    await entityManager.save(t3);

    await entityManager.save(a1);
    await entityManager.save(a2);

    const at = await entityManager.findOne(Article, {
      where: {
        id: 2,
      },
      relations: {
        tags: true,
      },
    });

    // 修改 id 为 2 的文章的 标题 和 tags
    at.title = "ccccc";
    at.tags = at.tags.filter((tag) => tag.name.includes("ttt1111"));
    await entityManager.save(at);

    const article = await entityManager.find(Article, {
      relations: {
        tags: true,
      },
    });

    console.log("article", article);
    console.log(article.map((item) => item.tags));

    // 因为中间表的外键设置了 CASCADE 的级联删除，只要删除了 article 或者 tag，它都会跟着删除关联记录
    // await entityManager.delete(Article, 1);
    // await entityManager.delete(Tag, 1); // DELETE FROM `tag` WHERE `id` IN (?) -- PARAMETERS: [1]


    const tags = await entityManager
      .getRepository(Tag)
      .createQueryBuilder("t")
      .leftJoinAndSelect("t.articles", "a")
      .getMany();
    console.log("tags: ", tags);
    console.log(tags.map((item) => item.articles));
  })
  .catch((error) => console.log(error));
