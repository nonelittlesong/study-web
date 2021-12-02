# TypeScript 数组类型

- `type[]`
- `Array<type>`
- `[xxXx: number]: number` — 用接口表示数组
- `Array-like Object`

## Array-like Object

```ts
interface IArguments {
  [index: number]: any;
  length: number;
  callee: Function;
}
```
