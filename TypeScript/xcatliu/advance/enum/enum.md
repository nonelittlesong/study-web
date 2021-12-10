# TypeScript 枚举

例子：

```ts
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
```

会被编译为：

```js
var Days;
(function (Days) {
  Days[Days['Sun'] = 0] = 'Sun';
  Days[Days['Mon'] = 1] = 'Mon';
  Days[Days['Tue'] = 2] = 'Tue';
  Days[Days['Wed'] = 3] = 'Wed';
  Days[Days['Thu'] = 4] = 'Thu';
  Days[Days['Fri'] = 5] = 'Fri';
  Days[Days['Sat'] = 6] = 'Sat';
})
```

所以：

```ts
console.log(Days['Sun'] === 0); // true
console.log(Days[0] === 'Sun'); // true
```

## 1. 手动赋值

- TypeScript 不会检查枚举的值是否重复

```ts
enum Days {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days['Sun']); // 3
console.log(Days['Wed']); // 3
console.log(Days[3]);     // Wed
```

递增到 3 时，Wed 把 Sun 覆盖了。

- 枚举项可以不是数字，要用 `<any>` 忽略类型检查（字符串除外），但后面不能接未手动赋值的项

```ts
// Enum member must have initializer.
// enum Days2 {Sun = 'Sun', Mon, Tue, Wed, Thu, Fri, Sat};

enum Days2 {Sun, Mon, Tue, Wed, Thu, Fri, Sat= 'Sat'};

console.log(Days2['Sun']); // 0
console.log(Days2['Mon']); // 1
console.log(Days2['Sat']); // Sat
console.log(Days2[6]);     // undefined
```

- 枚举项可以是小数和负数，步长仍然是 1

```ts
enum Days3 {Sun = 7, Mon = -1.2, Tue, Wed, Thu = 1.2, Fri, Sat};

console.log(Days3['Sun']); // 7
console.log(Days3['Mon']); // -1.2
console.log(Days3['Tue']); // -0.19999999999999996
console.log(Days3['Wed']); // 0.8
console.log(Days3['Thu']); // 1.2
console.log(Days3['Fri']); // 2.2
console.log(Days3['Sat']); // 3.2
```

## 2. 计算量

枚举项可以是计算量，后面不能接未手动赋值的项，其他项不能是字符串（除非被 `<any>` 修饰）

```ts
// 'SatSat'.length 为计算量
enum Days4 {Sun, Mon, Tue, Wed, Thu = <any>'Thu', Fri = <any>{Fri: 5}, Sat = 'SatSat'.length};

console.log(Days4);
// { '0': 'Sun',
//   '1': 'Mon',
//   '2': 'Tue',
//   '3': 'Wed',
//   '6': 'Sat',
//   Sun: 0,
//   Mon: 1,
//   Tue: 2,
//   Wed: 3,
//   Thu: 'Thu',
//   Fri: { Fri: 5 },
//   '[object Object]': 'Fri',
//   Sat: 6 }

console.log(Days4[<any>'Thu']);    // Thu
console.log(Days4[<any>{Fri: 5}]); // Fri
```

当以下情况满足时，枚举成员被当作常数：

- 没有初始化并且之前的枚举成员是常数。
- 使用常数表达式初始化
- 引用之前定义的常数枚举成员（可以是不同的枚举类型中定义的）。如果这个成员在同一个枚举类型中，可以使用非限定名来引用。

## 3. 常数枚举

常量枚举会在编译阶段被删除，并且不能包含计算成员

## 4. 外部枚举

外部枚举和声明语句一样，常出现在声明文件中。

同时使用 `declare` 和 `const` 也是可以的：

```ts
declare const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

编译结果为：

```ts
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```
