Map对象保存键值对。任何值（对象或者原始值）都可以作为一个键或者一个值。  
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map  

# 语法
**new Map([iterable])**  
### 参数
iterable  
iterable可以是一个数组或者其他iterable对象，其元素或为键值对，或为两个元素的数组。每个键值对都会添加到新的Map。null会被当作undefined。  

# 描述
一个Map对象在迭代时会根据对象中元素的插入顺序来进行。（一个for...of循环在每次迭代后会返回一个形式为\[key, value]的数组。  
### 键的相等
键的比较是基于“SameValueZero”算法：NaN是与NaN相等的（虽然NaN!==NaN），剩下所有其他的值是根据===运算符的结果判断是否相等的。  
在目前的ECMAScript规范中，-0和+0被认为是相等的，尽管这在早期的草案中并不是这样。  
### Objects和maps的比较
Objects和Maps类似的是，他们都允许你按键存取一个值，删除键，检测一个键是否绑定了值。  
因此（并且也没有其他内建的替代方式了）过去我们一直把对象当成Maps使用。  
不过Maps和Objects有一些重要的区别，在下列情况里使用Map会是更好的选择：  
* 一个Object的键只能是`字符串`或者`Symbols`，但是Map的键可以是**任意值**，包括函数、对象、基本类型。  
* Map中的键值是**有序的**，而添加到对象中的键则不是。  
* 你可以通过`size`属性直接获取一个Map中键值对个数，而Object的键值对个数只能手动计算。  
* Map可以直接进行迭代，而Object的迭代需要先获取他的键数组。  
* Object都有自己的原型，原型链上的键名可能和你自己在对象上设置的键名产生冲突。虽然ES5开始使用`map = Object.create(null)`来创建一个没有原型的对象。  
* `Map`在涉及频繁增删键值对的场景下会有些性能优势。  

# 属性
**Map.length**  
属性length的值为0。  
**[get Map\[@@species\]](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/@@species)**  
本构造函数用于创建派生对象。  
**[Map.prototype](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/prototype)**  
表示Map构造器的原型。允许添加属性从而应用与所有的Map对象。  

# Map原型
所有的Map对象实例都会继承Map.prototype。  
### 属性
**Map.prototype.constructor**  
返回一个函数，它创建了实例的原型。默认是Map函数。  
**Map.prototype.size**  
返回Map对象的键/值对的数量。  
### 方法
**Map.prototype.clear()**  
清除Map对象的所有键值对。  
**Map.prototype.delete(key)**  
如果Map对象中存在该元素，则移除它并返回true;否则返回false。  
**Map.prototype.entries()**  
返回一个新的Iterator对象，它按插入顺序包含了Map对象的每个元素的\[key, value\]数组。  
**Map.prototype.forEach(callbackFn\[, thisArg\])**  
按插入顺序，为Map对象里的每个键值对调用一次callbackFn函数。如果为forEach提供了thisArg，他将在每次回调中作为this值。  
**Map.prototype.get(key)**  
返回键对应的值，如果不存在，返回undefined。  
**Map.prototype.has(key)**  
返回一个bool值，表示Map实例是否包含键对应的值。  
**Map.prototype.keys()**  
返回一个新的Iterator对象，他按插入顺序包含了Map对象中每个元素的键。  
**Map.prototype.set(key, value)**  
设置Map对象中键的值。返回该Map对象。  
**Map.prototype.values()**  
返回一个新的Iterator对象，包含了Map对象每个元素的值。  
**Map.prototype\[@@iterator\]()**  
返回一个新的Iterator对象，他按插入的顺序包含了Map对象中每个元素的\[key, value\]数组。  

# 示例
