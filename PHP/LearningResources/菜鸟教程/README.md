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
