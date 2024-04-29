## 注意事项

级联操作

- CASCADE 的处理逻辑：

    - 删除和更新时的级联操作设置在具有外键的一方
    - 主表删除，从表关联记录也级联删除，主表 id 更新，从表关联记录也跟着更新。

- TypeORM 中的 cascade

    - `cascade: true` => 添加数据时，自动更新表 告诉 typeorm 当你增删改一个 Entity 的时候，是否级联增删改它关联的 Entity

        - 两个实体不能同时设置，否则会出现循环引用的错误

        - 解决办法是在另一个实体设置(如果确实需要两个实体都能实现级联): `cascade: ['insert', 'update']`

    - 一般在需要同步更新表的实体中设置 `cascade: true`

        - 比如：`@OneToOne(() => IdCard, idCard => idCard.user, { cascade: true })` 表示 user 表增删改的同时更新 id_card 表
