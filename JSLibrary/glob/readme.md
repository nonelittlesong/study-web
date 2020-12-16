# [glob](https://www.npmjs.com/package/glob)

![oh-my-glob.gif](https://git.io/JLGgG)

参考：  
* https://www.npmjs.com/package/glob
* https://www.cnblogs.com/liulangmao/p/4552339.html

## 1. 匹配

| 通配符 | 作用 |
| --- | --- |
| * | 匹配 0 或 多个字符 |
| ? | 匹配 1 个字符 |
| \[abcd]/\[a,b,cd] | 匹配 a，b，c，d 中的一个字符，`[!abcd]`/`[^abcd]`不匹配其中任何一个字符 |
| \[a-z]/\[0-9] | 匹配 a-z（0-9） 中的一个字符，`[` 右边添加 `！` 或 `^` 则不匹配范围中的任何字符 |
| ** | 如果单独放在一个路径区中，则匹配 0 或 多个子目录。**不会爬取软链接的目录**。 |

## 2. 点

`a/.*/c` 会匹配 `a/.b/c`，  
`a/*/c` 不会匹配 `a/.b/c`。  

