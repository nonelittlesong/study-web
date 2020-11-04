参考：  
* https://www.npmjs.com/package/glob
* https://www.cnblogs.com/liulangmao/p/4552339.html

# 一、 匹配

| 通配符 | 作用 |
| --- | --- |
| * | 匹配 0 或 多个字符 |
| ? | 匹配 1 个字符 |
| \[abcd]/\[a,b,cd] | 匹配 a，b，c，d 中的一个字符，`[!abcd]`/`[^abcd]`不匹配其中任何一个字符 |
| \[a-z]/\[0-9] | 匹配 a-z（0-9） 中的一个字符，`[` 右边添加 `！` 或 `^` 则不匹配范围中的任何字符 |
