# TypeScript 声明文件

- 全局变量 — 通过 `<script>` 引入第三方库，注入全局变量
  - `declare var` 声明全局变量
  - `declare function` 声明全局方法
  - `declare class` 声明全局类
  - `declare enum` 声明全局枚举类型
  - `declare namespace` 声明（含有子属性的）全局对象
  - `interface` 和 `type` 声明全局类型
- npm 包 — 通过 `import foo from 'foo'` 导入，符合 ES6 模块规范
  - `export` 导出变量
  - `export namespace` 导出（含有子属性的）对象
  - `export default` ES6 默认导出
  - `export =` commonjs 导出模块
- `export as namespace` UMD 库声明全局变量
- `declare global` 扩展全局变量
- `declare module` 扩展模块
- `/// <reference />` 三斜线指令

在 [这个网页](https://www.typescriptlang.org/dt/search?search=) 查找你需要的声明文件！

- `UMD 库` — 既可以通过 `<script>` 标签引入，又可以通过 `import` 导入
- `直接扩展全局变量` — 通过 `<script>` 标签引入后，改变一个全局变量的结构
- `在 npm 包或 UMD 库中扩展全局变量` — 引入 npm 包或 UMD 后，改变一个全局变量的结构
- `模块插件` — 通过 `<script>` 或 `import` 导入后，改变另一个模块的结构

## 1. 全局变量

通过 `<script>` 标签引入第三方库，注入全局变量

### 1.1. `declare var`

也可以用 `declare let` / `declare const`，推荐使用 `declare const`。

使用全局变量的声明文件时，如果是以 `npm install @types/xxx --save-dev` 安装的，则不需要任何配置。

声明语句中只能定义类型，不能定义具体的实现。

```ts
declare const jQuery: (selector: string) => any;
```

### 1.2. `declare function`

支持重载：

```ts
declare function jQuery(selector: string): any;
declare function jQuery(domReadyCallback: () => any): any;
```

### 1.3. `declare class`

`declare class` 和 `interface` 一样，只能定义类型，不能定义具体实现：

```ts
declare class Animal {
  name: string;
  constructor(name: string);
  sayHi(): string;
}
```

### 1.4. `declare enum`

```ts
declare enum Directions {
  Up,
  Down,
  Left,
  Right
}
```

### 1.5. `declare namespace`

`namespace` 用于替代 TS 早期的 `module`，不推荐使用。

```ts
declare namespace jQuery {
  function ajax(url: string, settings?: any): void;
  const version: number;
  class Event {
    blur(eventType: EventType): void
  }
  enum EventType {
    CustomClick
  }
}
```

在 `declare namespace` 内部，使用 `function ajax` 来声明函数，而不是 `declare function ajax`。

嵌套的 `namesapce`：

```ts
declare namesapce jQuery {
  function ajax(url: string, settings: any): void;
  namesapce fn {
    function extend(object: any): void;
  }
}
```

### 1.6. `interface` 和 `type`

声明全局的接口或类型：

```ts
interface AjaxSettings {
  method?: 'GET' | 'POST';
  data?: any;
}
```

### 1.7. 声明合并

既是一个对象，又是一个函数：

```ts
declare function jQuery(selector: string): any;
declare namesapce jQuery {
  function ajax(url: string, settings?: any): void;
}
```

## 2. npm 包

通过 `import foo from 'foo'` 导入，符合 ES6 模块规范

当 npm 包没有提供声明文件，我们需要手动添加：

1. 创建一个 `node_modules/@types/foo/index.d.ts` 文件，存放 `foo` 模块的声明文件。不推荐。
2. 创建一个 `types` 目录，将 `foo` 的声明文件放到 `types/foo/index.d.ts` 中。这种方式要配置 `tsconfig.json` 中的 `paths` 和 `baseUrl` 字段。

目录结构：

```
/path/to/project
├── src
|  └── index.ts
├── types
|  └── foo
|     └── index.d.ts
└── tsconfig.json
```

tsconfig.json:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "baseUrl": "./",
    "paths": {
      "*": ["types/*"]
    }
  }
}
```

### 2.1. `export`

npm 包中的声明文件，必须使用 `export` 导出，然后在使用方 `import` 导入，才会得到这些类型声明。

```ts
export const name: string;
export function getName(): string;
export class Animal {
  constructor(name: string);
  sayHi():string;
}
export enum Directions {
  Up,
  Down,
  Left,
  Right
}
export interface Options {
  data: any;
}
```

对应的导入和使用模块：

```ts
import { name, getName, Animal, Directions, Options } from 'foo';

console.log(name);
let myName = getName();
let cat = new Animal('Tom');
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
let options: Options = {
  data: {
    name: 'foo'
  }
}
```

我们可以使用 `declare` 先声明多个变量，最后再用 `export` 一次性导出：

```ts
declare const name: string;
declare function getName(): string;
declare class Animal {
  constructor(name: string);
  sayHi(): string;
}
declare enum Directions {
  Up,
  Down,
  Left,
  Right
}
interface Options {
  data: any;
}

export { name, getName, Animal, Directions, Options };
```

### 2.2. `export namespace`

```ts
export namespace foo {
  const name: string;
  namespace bar {
    function baz(): string;
  }
}
```

### 2.3. `export default`

只有 `function`、`class` 和 `interface` 可以直接默认导出，其他的变量需要先定义出来，再默认导出：

```ts
// 导出语句，一般放在文件最前面
export default Directions;

// 声明语句，可以放在导出语句后面
declare enum Directions {
  Up,
  Down,
  Left,
  Right
}
```

### 2.4. `export =`

在 commonjs 中，使用以下方式导出一个模块：

```js
// 整体导出
module.exports = foo;
// 单个导出
exports.bar = bar;
```

TS 针对这种情况，有以下导入方式：

- 方式1 `const ... = require`
  ```ts
  // 整体
  const foo = require('foo');
  // 单个
  const bar = require('foo').bar;
  ```
- 方式2 `import ... from`
  ```ts
  // 整体
  import * as foo from 'foo';
  // 单个
  import { bar } from 'foo';
  ```
- 方式3 `import ... = require`，官方推荐
  ```ts
  // 整体导入
  import foo = require('foo');
  // 单个导入
  import bar = foo.bar;
  ```

为 commonjs 写类型声明文件，需要 `export =` 语法：

```ts
export = foo;

declare function foo(): string;
declare namespace foo {
  const bar: number;
}
```

上例使用了 `export =`，不能再单个导出 `export { bar }` 了，所以用 `declare namespace foo` 将 `bar` 合并到 `foo` 里。


## 3. UMD 库

即可以通过 `<script>`，又可以 `import` 导入的库，称为 UMD 库。

相比于 npm 包的类型声明文件，我们需要额外声明一个全局变量，为了实现这种方式， TS 提供了一个新的语法 `export as namespace`。

```ts
export as namespace foo;
export = foo;
// 或
// export default foo;

declare function foo(): stirng;
declare namespace foo {
  const bar: number;
}
```

## 4. 直接扩展全局变量

