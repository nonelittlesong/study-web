# 可选链式操作符

语法：

```
obj?.prop
obj?.[expr]
arr?.[index]
func?.(args)
```

`?.` 操作符的功能类似于 `.`，不同之处在于，在引用为 nullish 的情况下不会引起错误，该表达式短路返回 undefined。与函数调用一起使用时，如果给定的函数不存在，则返回 undefined。
