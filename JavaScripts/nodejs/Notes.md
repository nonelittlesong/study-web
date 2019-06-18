# [SyntaxError: import declarations may only appear at top level of a module](https://stackoverflow.com/questions/42237388/syntaxerror-import-declarations-may-only-appear-at-top-level-of-a-module)

# [require，import区别](https://www.zhihu.com/question/56820346)
## 1、 require/exports 和 import/export 形式不一样
require/exports 的用法只有以下三种简单的写法：  
```js
const fs = require('fs')
exports.fs = fs
module.exports = fs
```
而 import/export 的写法就多种多样：  
```js
import fs from 'fs'
import {default as fs} from 'fs'
import * as fs from 'fs'
import {readFile} from 'fs'
import {readFile as read} from 'fs'
import fs, {readFile} from 'fs'

export default fs
export const fs
export function readFile
export {readFile, read}
export * from 'fs'
```
