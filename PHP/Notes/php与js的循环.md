# for 循环
JavaScript:  
```js
for (var index = 0; index < myArray.length; index++) {
    console.log(myArray[index]);
}
```
PHP:  
```php
<?php
$myArray = array(1, 2, "Wu", "Song");
for ($index = 0; $index < count($myArray); $index++) {
    //echo $myArray[$index] . '<br/>';
    //print $myArray[$index] . '<br/>';
    //echo '$myArray[$index]<br/>';    // 单引号不能解析变量，可以解析标签
    print "$myArray[$index]<br/>";
}
```

# 遍历数组
JavaScript 的 `for-of`：  
```js
for (let value of myArray) {
    console.log(value);
}
```

PHP 的 `foreach-as`:  
```php
foreach ($myArray as &$value) { // 如果要修改值，要添加&
    $value = $value * 2;
}
unset($value); // 最后取消掉引用

foreach ($myArray as $key => $value) {
    echo "Key: $key; Value: $value<br />\n";
}
```


# JavaScripts 特性
## 1、 Array 类型的 `forEach()` 方法
```js
var myArray = new Array(3, 2, 1);
// let myArray = [3, 2, 1];

myArray.forEach(function (value, index, array) {
    console.log(value);
});
```

## 2、 遍历对象
```js
if (objectName) {
    for (let propName in objectName) {
        console.log(propName); // 没有顺序
    }
}
```
不要用 `for-in` 遍历数组。  

