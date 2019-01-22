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
在解析错误时，仍返回Document对象，但文档元素是\<parsererror>，内容是对解析错误的描述。  
### 3. XMLSerializer类型
```js
var serializer = new XMLSerializer();
var xml = serializer.serializeToString(xmldom);
alert(xml);
```
如果将非DOM对象传入serializeToString()，会导致错误发生。  

### 通用方法处理XML
```js
function parseXML() {
  try {
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
  } catch (e) {
    try {
      xmlDoc = document.implementation.createDocument("","",null);
    } catch (e) {
      alert(e.message);
      return;
    }
  }
  
  xmlDoc.async = false;
  xmlDoc.load("../xml/test.xml");
  document.getElementById("to").innerHTML=xmlDoc.getElementsByTagName("to")[0].childNodes[0].nodeValue;
  document.getElementById("from").innerHTML=xmlDoc.getElementsByTagName("from")[0].childNodes[0].nodeValue;
  document.getElementById("message").innerHTML=xmlDoc.getElementsByTagName("body")[0].childNodes[0].nodeValue;
}
```

# 二、 浏览器对XPath的支持
XPath是设计用来查找节点。  
### 1. DOM3级XPath
XPathEvaluator：  
* createExpression(expression, nsresolver): 将XPath表达式以及相应的命名空间信息转换成一个XPathExpression，这是查询的编译版。在多次使用同一个查询时很有用。  
* createNSResolver(node): 根据node的命名空间信息创建一个新的XPathNSResolver对象。在基于使用命名空间的XML文档求值时，需要使用XPathNSResolver对象。  
* evaluate(expression, context, nsresolver, type, result): 在给定的上下文中，基于特定的命名空间信息来对XPath表达式求值。  

```js
var result = xmldom.evaluate(
