# 一、 export
export 创建 JS 模块导出函数、对象或者基本数据值，可以被 import 导入。  

导出的模块是 strict mode，无论是否申明。  

export 不能用在嵌入的脚本中。  

## 1、 语法
1. Named Exports（每个module有0或多个exports）
2. Default Exports（每个module只有1个export）
3. Hybrid Exports（杂交导入）

```js
// 导出单独的特性
export let name1, name2, ..., nameN;             // also var, const
export let name1 = ..., name2 = ..., ..., nameN; // also var, const
export function functionName() { ... }
export class ClassName { ... }

// 导出列表
export { name1, name2, ..., nameN};

// 重命名
export { variable1 as name1, variable2 as name2, ..., nameN };

// 导出带重命名的解构赋值
export const { name1, name2: bar } = o;

// 默认导出
export default expression;
export default function(...) { ... }       // also class, function*
export default function name1(...) { ... } // also class, function*
export { name1 as default, ... };

// 导导入
export * from ...;
export { name1, name2, ..., nameN } from ...;
export { import1 as name1, import2 as name2, ..., nameN } from ...;
export { default } from ...;
```

# 二、 import
import 只能在 type="module" 的 script 中使用。  
import() 不需要 type="module"。  

## 1、 语法
```js
import defaultExport from 'module-name';
import * as name from 'module-name';
import { export1 } from 'module-name';
import { export1 as alias1 } from 'module-name';
import { export1, export2, ..., exportN } from 'module-name';
import { foo, bar } from 'module-name/path/to/specific/un-exported/file';
import { export1, export2 as alias2, [...] } from 'module-name';
import defaultExport, { export1[, ...] } from 'module-name';
import defaultExport, * as name from 'module-name';
import 'module-name'; // 只导入副作用。运行模块的全局代码，但不导入任何值。
var promise = import('module-name');
```

## 2、 动态导入
```js
const main = document.querySelector("main");
for (const link of document.querySelectorAll("nav > a")) {
  link.addEventListener("click", e => {
    e.preventDefault();

    import('/modules/my-module.js')
      .then(module => {
        module.loadPageInto(main);
      })
      .catch(err => {
        main.textContent = err.message;
      });
  });
}
```
