import "reflect-metadata"
import { DataSource } from "typeorm"
import { Article } from "./entity/Article"
import { Tag } from "./entity/Tag"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "sheng",
    database: "typeorm-practice",
    synchronize: true,
    logging: true,
    entities: [Article, Tag],
    migrations: [],
    subscribers: [],
    poolSize: 10, // 数据库连接池中连接的最大数量
    connectorPackage: 'mysql2',
    extra: {
        authPlugins: 'sha256_password',
    }
})
