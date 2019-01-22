# 一、 浏览器对XML DOM的支持
### 1. DOM2级核心
创建一个\<root>的XML文档：  
```js
var xmldom = document.implementation.createDocument("", "root", null);
alert(xmldom.documentElement.tagName); // "root"
var child = xmldom.createElement("child");
xmldom.documentElement.appendChild(child);
```
要检测浏览器是否支持DOM2级XML，可以使用下面的代码：  
```js
var hasXmlDom = document.implementation.hasFeature("XML", "2.0");
```
### 2. DOMParser类型
parseFromString()：  
接受两个参数：要解析的XML字符串和内容类型（内容类型始终都应该是"text/xml"）。
返回的是一个Document的实例。  
```js
var parser = new DOMParser();
var xmldom = parser.parseFromString("<root><child/></root>", "text/xml");
alert(xmldom.documentElement.tagName); // "root"
alert(xmldom.documentElement.firstChild.tagName); // "child"

var anotherChild = xmldom.createElement("child");
xmldom.documentElement.appendChild(anotherChild);
var children = xmldom.getElementsByTagName("child");
alert(children.length); // 2
```
在解析错误时，仍返回Document对象，但文档元素是<parsererror>，内容是对解析错误的描述。  
### 3. XMLSerializer类型
```js
var serializer = new XMLSerializer();
var xml = serializer.serializeToString(xmldom);
alert(xml);
```
如果将非DOM对象传入serializeToString()，会导致错误发生。  
