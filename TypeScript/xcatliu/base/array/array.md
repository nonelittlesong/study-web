# TypeScript 数组类型

- `type[]`
- `Array<type>`
- `[xxXx: number]: number` — 用接口表示数组
- `Array-like Object`

```ts
// type[]
let fibonacci1: number[] = [1, 1, 2, 3, 5];

// Array<type>
let fabonacci2: Array<number> = [1, 1, 2, 3, 5];

// [xxXx: number]: number
interface NumberArray {
  [index: number]: number
}
let fabonacci3: NumberArray = [1, 1, 2, 3, 5];
```

## Array-like Object

类数组对象，不是数组！

```ts
function sum() {
  let args: number[] = arguments; // 报错，IArguments 缺少 number[] 里的属性
}
```

IArguments:

```ts
interface IArguments {
  [index: number]: any;
  length: number;
  callee: Function;
}
```
