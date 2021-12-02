# TypeScript 类型断言

作用：

- 联合类型断言为具体类型
  - 我们可能需要访问联合类型的某个具体类型的属性或方法
- 父类断言为子类
  - `class` — 子类是 class，用 `instanceof` 更合适
  - `interface` — 子类是 interface，不能使用 `instanceof`
- 任何类型断言为 any
  - 如，给 window 添加一个属性：`(window as any).foo = 1`
- any 断言为具体类型

限制：

- 要使得 A 能够被断言为 B，只要 A 兼容 B 或者 B 兼容 A 即可。
- 不要使用【双重断言】，` A as any as B`


## 1. 类型断言 VS 类型声明

- `A` 断言为 `B`，只需要满足 `A` 兼容 `B` 或者 `B` 兼容 `A` 即可
- `A` 赋值给 `B`，需要满足 `B` 兼容 `A`

请优先使用类型声明！！

## 2. 类型断言 VS 泛型

用于去掉代码中 any 的最优方案：

```ts
function getCacheData<T>(key: string): T {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData<Cat>('tom');
tom.run();
```
