# TypeScript 函数类型

- `let funcName: (x: <type>, ...) => <type> = ...` 函数表达式
- 用接口定义函数的形状
- 参数
  - 可选参数 - 必在必要函数后面
  - 默认参数 - 可以在必要函数前面
  - 剩余函数
- 重载

## 1. 接口定义函数形状

```ts
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```

## 2. 重载

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```
