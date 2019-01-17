JSON只是一种数据格式，很多语言都有针对JSON的解析器和序列化器。  

# 一、 语法
JSON有三种类型：  
1. 简单值：与js相同，有字符串、数值、布尔值和null，没有undefined。  
2. 对象：一组有序的键值对。  
3. 数组：一组有序的值的列表。  

### 1. 简单值
JSON字符串必须双引号。  

### 2. 对象
JSON要给属性加上引号：  
```js
{
    "name": "Nicholas",
    "age": 29
}
```

### 3. 数组
`[25, "hi", true]`  

# 二、 解析与序列化
优势： 与XML数据结构要解析成DOM文档并从中提取数据相比，JSON可以解析成JavaScript对象。  
### 1. JSON对象
JSON有两个方法：  
* stringify() 把JavaScript对象序列化为JSON字符串。  
* parse() 把JSON字符串解析为原生JavaScript值。  

**JSON.stringify()输出的JSON字符串不包含任何空格字符或缩进。**  
在序列化JavaScript对象时，所有函数及原型成员都会被有意忽略，不体现在结果中。此外，值为undefined的任何属性也都会被跳过。  

### 2. 序列化选项
JSON.stringify()还可以接受两个参数：  
* 第一个参数是一个过滤器，可以是一个数组，也可以是一个函数。  
* 第二个参数是一个选项，表示是否在JSON字符串中保留缩进。  

1. 过滤结果  
   1. 如果过滤器是数组，那么JSON.stringify()的结果中只包含数组中列出的属性。  
   2. 如果是函数，传入的函数接受两个参数：属性名和属性值。为了改变序列化对象的结果，函数返回的值就是相应键的值。如果函数返回了undefined，那么相应的属性会被忽略。  
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
2. 字符串缩进
