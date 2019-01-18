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
   2. 如果是函数，传入的函数接受两个参数：属性名和属性值。为了改变序列化对象的结果，函数返回的值就是相应键的值。如果函数返回了undefined，那么相应的属性会   被忽略。  
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
   1. 如果是数值，代表缩进的空格数。不超过10。  
   2. 如果是字符串，使用字符串缩进。长度不超过10。  
3. toJSON()
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
   可以让toJSON()方法返回undefined，此时如果包含它的对象嵌入另一个对象中，会导致该对象的值变成null，而如果包含它的对象是顶级对象，结果就是undefined。  
   toJSON()可以作为函数过滤器的补充，因此理解序列化内部顺序十分重要：  
   （1） 如果存在toJSON()方法而且能通过它取得有效的值，则调用该方法。否则，按默认顺序执行序列化。  
   （2） 如果提供了第二个参数，应用这个函数过滤器。传入函数过滤器的值是第（1）步的返回值。  
   （3） 对第（2）步返回的每个值进行相应的序列化。  
   （4） 如果提供了第三个参数，执行相应的缩进。  
   
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

