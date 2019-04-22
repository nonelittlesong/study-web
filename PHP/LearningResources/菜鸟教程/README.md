# 一、 基本语法
```php
<?php
// PHP 代码
?>
```
# 二、 变量
**php变量规则：**  
* 变量以$符号开始，后面跟着变量的名称

**作用域：**  
* local
* global
* static
* parameter

**global关键字：**  
作用： 在函数的内部访问全局变量。  
PHP将所有的全局变量存储在一个名为$GLOBALS\[index]的数组中。index保存变量的名称。  

**Static作用域：**  
函数执行结束后，static局部变量不被删除。  

# 三、 echo和print
区别：  
* echo可以输出一个或多个字符串;print只能输出一个字符串
* echo的输出速度比print快
* echo没有返回值;print的返回值总为1
### 1、 echo
输出变量和数组：  
```php
<?php
$txt1 = "学习 php";
$txt2 = "RUNNOOB.COM";
$cars = array("Volvo", "BMW", "Toyota");

echo $txt1;
echo "<br>";
echo "在$txt2学习PHP";
echo "<br>";
echo "我的车牌是{$cars[0]}";
?>
```
### 2、 print
print和echo可以使用或省略括号。  

# 四、 EOF
使用方法：  
* 结束标识必须后接分号，否则编译通不过。
* EOF可以使用任意其他字符代替。
* 结束表识必须顶格独自占一行。
* 在PHP定界符EOF中的任何特殊字符都不需要转义。
* 双引号内的转义符具有转义效果。

例子：  
```php
<?php
echo <<<EOF
  <h1>我的第一个标题</h1>
  <p>我的第一个段落。</p>
EOF;
?>
```

# 五、 数据类型
### 1、 字符串
用单引号或双引号。  
### 2、 数组
```php
<?php
$cars = array("Volvo", "BMW", "Toyota");
var_dump($cars); // array(3) { [0]=> string(5) "Volvo" [1]=> string(3) "BMW" [2]=> string(6) "Toyota" } 
?>
```
### 3、 对象
```php
<?php
class Car
{
  var $color;
  function __construct($color="green") {
    $this->color = $color;
  }
  function getColor() {
    return $this->color;
  }
}
?>

