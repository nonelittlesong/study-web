# XML

extensible markup language，可扩展标记语言。

参考：

- [DOM Standard](https://dom.spec.whatwg.org/#xmldocument)

## 1. JS 解析 XML 字符串或文件

### 1.1. 解析字符串

```js
function createXml(str) {
  if (document.all) {
    var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async = false;
    xmlDoc.loadXML(str);
    return xmlDoc;
  }
　else{//非IE浏览器
　　return new DOMParser().parseFromString(str, "text/xml");
  }
}
```

### 1.2. 解析文件

```js
/**
* aXMLFileName是xml文件路径名
*/
function getXmlDoc(){
    try{
      if (window.ActiveXObject){
        xmlDoc= new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        isLoaded = xmlDoc.load(aXMLFileName);
      }
      else if(document.implementation&& document.implementation.createDocument){
        try{
            xmlDoc = document.implementation.createDocument('', '', null);
            xmlDoc.async = false;
            xmlDoc.load(aXMLFileName);
        } catch(e){
            var xmlhttp = new window.XMLHttpRequest();
            xmlhttp.open("GET",aXMLFileName,false); 
            xmlhttp.send(null);
            xmlDoc = xmlhttp.responseXML;
        }
      }
      else{
          alert("load data error");
      }
    }
    catch(e){  
        alert(e.message);
    }
}
```

## 2. 浏览器对 XML DOM 的支持

### 2.1. DOM2 级核心

创建一个\<root>的 XML 文档：

```js
var xmldom = document.implementation.createDocument("", "root", null);
alert(xmldom.documentElement.tagName); // "root"
var child = xmldom.createElement("child");
xmldom.documentElement.appendChild(child);
```

要检测浏览器是否支持 DOM2 级 XML，可以使用下面的代码：

```js
var hasXmlDom = document.implementation.hasFeature("XML", "2.0");
```

### 2.2. DOMParser 类型

`parseFromString()`：
接受两个参数

1. 要解析的XML字符串。
2. 内容类型（内容类型始终都应该是"text/xml"）。

返回的是一个 Document 的实例

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
### 2.3. XMLSerializer类型
```js
var serializer = new XMLSerializer();
var xml = serializer.serializeToString(xmldom);
alert(xml);
```

如果将非 DOM 对象传入 `serializeToString()`，会导致错误发生。

### 2.4 通用方法处理XML
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

## 3. 浏览器对XPath的支持

XPath 是设计用来查找节点。

### 3.1. DOM3 级 XPath
XPathEvaluator：  
* createExpression(expression, nsresolver): 将XPath表达式以及相应的命名空间信息转换成一个XPathExpression，这是查询的编译版。在多次使用同一个查询时很有用。  
* createNSResolver(node): 根据node的命名空间信息创建一个新的XPathNSResolver对象。在基于使用命名空间的XML文档求值时，需要使用XPathNSResolver对象。  
* evaluate(expression, context, nsresolver, type, result): 在给定的上下文中，基于特定的命名空间信息来对XPath表达式求值。  
