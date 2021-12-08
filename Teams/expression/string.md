# 字符串函数

Teams List 单行空白符会自动 trim 掉。

## empty

```
empty('<collection>')
empty([<collection>])
```

| 参数 | 必需 | 类型 | 描述 |
| --- | --- | --- | --- |
| `<collection>` | 是 | String, Array, Object(Null) | 判断集合是否为空 |

| 返回值 | 类型 | 描述 |
| --- | --- | --- |
| true or false | Boolean | 集合为空时返回 true，集合不为空时返回 false |

空白字符组成的字符串，不为空！

## trim

```
trim('<text>')
```

| 参数 | 必需 | 类型 | 描述 |
| --- | --- | --- | --- |
| `<text>` | 是 | String | 删除首位空白字符 |

| 返回值 | 类型 | 描述 |
| --- | --- | --- |
| `<updatedText>` | String | 去除首位空白字符的新串 |

trim 不能用于 Null。

