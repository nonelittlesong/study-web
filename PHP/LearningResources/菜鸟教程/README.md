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
```
### 4、 常量
常量前面没有$。  
语法：
`bool define(string $name, mixed $value [, bool $case_insensitive = false ])`  

例子：  
```php
<?php
// 区分大小写的常量名
define("GREETING", "欢迎访问 Runoob.com");
echo GREETING;    // 输出 "欢迎访问 Runoob.com"
echo '<br>';
echo greeting;    // 输出 "greeting"
?>
```

# 六、 字符串
在php中，只有一个字符串运算符： .  

### 1、 strlen()函数
返回字符串的长度。  
```php
<?php
echo strlen("中文字符"); // 12
?>
```
strlen()中一个中文字符长度为3。  
可以使用mb_strlen()制定编码：  
```php
<?php
echo mb_strlen("中文字符", 'utf-8'); // 4
?>
```
### 2、 strpos()函数
```php
<?php
echo strpos("hello world!", "world");  // 6
?>
```
mb_strpos()按字处理，strpos()按字符处理：  
```php
<?php
echo strpos('开始23测试ceshi', '测试') . PHP_EOL;     // 8
echo mb_strpos('开始23测试ceshi', '测试') . PHP_EOL;  // 4

echo strpos('123测试ceshi', '测试') . PHP_EOL;        // 3
echo mb_strpos('123测试ceshi', '测试') . PHP_EOL;     // 3
?>
```

# 七、 运算符
### 1、 php算术运算符
特色：  
* -x： 取反
* a . b： 并置
* a / b： 两个整数相除可能得到小数
* intdiv(a, b)： 整除

### 2、 赋值运算符
特色：  
* a .= b： 连接两个字符串

### 3、 
