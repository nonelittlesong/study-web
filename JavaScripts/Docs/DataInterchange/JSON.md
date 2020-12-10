# JSON 
JSON 只是一种数据格式，很多语言都有针对 JSON 的解析器和序列化器。

## 1. 语法

JSON 有三种类型：

1. 简单值 — 与 js 相同，有字符串、数值、布尔值和 null，没有 undefined。
2. 对象 — 一组有序的键值对。
3. 数组 — 一组有序的值的列表。

### 1.1. 简单值

:warning: JSON 字符串必须双引号。

### 1.2. 对象

JSON 要给属性加上引号：

```json
{
  "name": "Nicholas",
  "age": 29
}
```

### 1.3. 数组

```json
[25, "hi", true]
```

## 2. 解析与序列化

优势： 与 XML 数据结构要解析成 DOM 文档并从中提取数据相比，JSON 可以解析成 JavaScript 对象。

### 2.1. JSON对象

JSON 对象有两个方法：

- `stringify()` — 把 JavaScript 对象序列化为 JSON 字符串。
- `parse()` — 把 JSON 字符串解析为原生 JavaScript 值。

:warning: **`JSON.stringify()` 输出的 JSON 字符串不包含任何「空格字符或缩进」**。

在序列化 JavaScript 对象时，所有函数及原型成员都会被有意忽略，不体现在结果中。  
此外，值为 `undefined` 的任何属性也都会被跳过。

### 2.2. 序列化选项

`JSON.stringify()` 接受三个参数：

- 第一个参数是被序列化的对象。
- 第二个参数是一个「过滤器」，可以是一个数组，也可以是一个函数。
- 第三个参数是一个「选项」，表示是否在 JSON 字符串中保留缩进。

#### 过滤器

1. 如果过滤器是数组，那么 `JSON.stringify()` 的结果中只包含数组中列出的属性。  
2. 如果过滤器是函数，传入的函数接受两个参数：「属性名」和「属性值」。  
   为了改变序列化对象的结果，函数返回的值就是相应键的值。如果函数返回了 `undefined`，那么相应的属性会被忽略。

```js
var book = {
    "title": "professional JavaScript",
    "authors": [
    "Nicholas C. Zakas"
    ],
    edition: 3,
    year: 2011
};
var jsonText = JSON.stringify(book, function(key, value) {
    switch(key) {
    case "authors":
        return value.join(",");
    case "year":
        return 5000;
    case "edition":
        return undefined;
    default:
        return value;
    }
});
```

#### 字符串缩进

1. 如果是「数值」，表示缩进的空格数。不超过 10。  
2. 如果是「字符串」，表示使用字符串缩进。长度不超过 10。  

#### toJSON()

定义一个对象的 `toJSON()` 方法。

```js
var book = {
  "title": "Professional JavaScript",
  "authors": [
    "Nicholas C. Zakas"
  ],
  edition: 3,
  year: 2011,
  toJSON: function() {
    return this.title;
  }
};
var jsonText = JSON.stringify(book);
```

可以让 `toJSON()` 方法返回 undefined，此时如果包含它的对象嵌入另一个对象中，会导致该对象的值变成 null，而如果包含它的对象是顶级对象，结果就是 undefined。  

`toJSON()` 可以作为函数过滤器的补充，因此理解序列化内部顺序十分重要：

1. 如果存在 `toJSON()` 方法而且能通过它取得有效的值，则调用该方法。否则，按默认顺序执行序列化。
2. 如果提供了第二个参数，应用这个函数过滤器。传入函数过滤器的值是第（1）步的返回值。
3. 对第（2）步返回的每个值进行相应的序列化。
4. 如果提供了第三个参数，执行相应的缩进。
   
### 3. 解析选项

```js
var book = {
  "title": "Profession JavaScript",
  "authors": [
    "Nicholas C. Zakas"
  ],
  edition: 3,
  year: 2011,
  releaseDate: new Date(2011, 11, 1)
};
var jsonText = JSON.stringify(book);
var bookCopy = JSON.parse(jsonText, function(key, value) {
  if (key == "releaseDate") {
    return new Date(value);
  } else {
    return value;
  }
});
```
