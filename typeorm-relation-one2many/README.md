## 注意事项

- 在多的一方，使用`@ManyToOne`注解，相关实体将会拥有"关联 id"和外键

    - 一般不需要设置 `@joinColumn` 属性，默认的关联字段名是"关联实体类名+Id"

    - 当然，如果要自定义关联列在数据库中的名称，可以使用 `@joinColumn(name="my_column_name")` 来修改

    - `@ManyToOne` 可以单独使用，但 `@OneToMany` 必须搭配 `@ManyToOne` 使用
