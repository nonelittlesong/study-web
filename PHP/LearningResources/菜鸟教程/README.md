https://www.runoob.com/php/php-tutorial.html  

# 目录
<details>
<summary>点击展开目录菜单</summary>
 
* [一、 基本语法](#一-基本语法)
* [二、 变量](#二-变量)
* [三、 echo和print](#三-echo和print)
* [四、 EOF](#四-EOF)
* [五、 数据类型](#五-数据类型)
* [六、 字符串](#六-字符串)
* [七、 运算符](#七-运算符)
* [八、 PHP If...Else语句](#八-PHP-IfElse语句)
* [九、 PHP数组](#九-PHP数组)
* [十、 PHP数组排序](#十-PHP数组排序)
* [十一、 PHP超级全局变量](#十一-PHP超级全局变量)
* [十二、 PHP循环](#十二-PHP循环)
* [十三、 魔术常量](#十三-魔术常量)
* [十四、 PHP命名空间（namespace）](#十四-PHP命名空间namespace)
* [十五、 PHP面向对象OOP](#十五-PHP面向对象OOP)

</details>
  

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

### 3、 php比较运算符
| 运算符 | 名称 | 描述 | 实例 |
| --- | --- | --- | --- |
| x === y | 绝对等于 | 如果x等于y，且他们类型相同，则返回true | 5==="5"返回false |
| x !== y | 绝对不等于 | 如果x不等于y，或他们类型不相同，则返回true | 5！=="5"返回true |

```php
<?php
$x=100; 
$y="100";
 
var_dump($x == $y);  // true
echo "<br>";
var_dump($x === $y); // false
echo "<br>";
var_dump($x != $y);  // false
echo "<br>";
var_dump($x !== $y); // true
echo "<br>";
 
$a=50;
$b=90;
 
var_dump($a > $b);  // false
echo "<br>";
var_dump($a < $b);  // true
?>
```

### 4、 php逻辑运算符
特色：  
* xor: 异或  

### 5、 php数组运算符
| 运算符 | 名称 | 描述 |
| --- | --- | --- |
| x + y | 集合 | x和y的集合 |
| x == y | 相等 | 如果x和y具有相同的键值对，则返回true |
| x === y | 恒等 | 如果x和y具有相同的键值对，且顺序相同，则返回true |
| x != y | 不等 | 如果x不等于y，则返回true |
| x <> y | 不等 | 如果x不等于y，则返回true |
| x !== y | 不恒等 | 如果x不等于y，或顺序不同，则返回true |

### 6、 三元运算符
```php
(expr1) ? (expr2) : (expr3);
(expr1) ?: (expr2);
```
在PHP7+版本多了一个NULL合并运算符`??`，实例如下：  
```php
<?php
// 如果$_GET['user']不存在返回'nobody'，否则返回$_GET['user']的值
$username = $_GET['user'] ?? 'nobody';
// 类似的三元运算符
$username = isset($_GET['user']) ? $_GET['user'] : 'nobody';
```

### 7、 组合比较符（PHP7+）
语法格式：  
`$c = $a <=> $b;`  

* 如果$a>$b，则$c的值为1
* 如果$a==$b，则$c的值为0
* 如果$a<$b，则$c的值为-1

# 八、 PHP If...Else语句
`elseif`是PHP为`else if`专门做的容错版。  

# 九、 PHP数组
### 1、 数值数组
**获取数组的长度-count()函数**  
```php
<?php
$cars = array("Volvo", "BMW", "Toyota");
echo count($cars); // 3
?>
```
### 2、 关联数组
指定键：  
```php
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
// or
$age['Peter'] = "35";
$age['Ben'] = "37";
$age['Joe'] = "43";
```
**新增元素：**  
对关联数组新增不带键的元素，  
若前面的元素有数字（或数字字符）键，新增元素的键是前面最大数字加1。  
若前面的元素无数字键，新增元素的键为0。  
```php
<?php
$arr = array(12 => 1, 5 => 2);
$arr[] = 56;
$arr["x"] = 42;
echo var_dump($arr); // array(4) { [12]=> int(1) [5]=> int(2) [13]=> int(56) ["x"]=> int(42) }
?>
```

**遍历关联数组**  
```php
<?php
$age = array("Peter"=>"35","Ben"=>"37","Joe"=>"43");

foreach ($age as $x=>$x_value) {
  echo "Key=" . $x . ", Value=" . $x_value;
  echo "<br>";
}
?>
```

foreach仅能用于数组和对象，有两种语法：  
```php
foreach (array_expression as $value)
  statement
foreach (array_expression as $key => $value)
  statement
```

# 十、 PHP数组排序
* sort() - 对数组进行升序排序
* rsort() - 对数组进行降序排序
* asort() - 根据关联数组的值，对数组进行升序排序
* ksort() - 根据关联数组的键，对数组进行升序排序
* arsort() - 根据关联数组的值，对数组进行降序排序
* krsort() - 根据关联数组的键，对数组进行降序排序

# 十一、 PHP超级全局变量
php预定义的全局变量。  
* $GLOBALS
* $\_SERVER
* $\_REQUEST
* $\_POST
* $\_GET
* $\_FILES
* $\_ENV
* $\_COOKIE
* $\_SESSION

# 十二、 PHP循环
* while - 只要指定的条件成立，则循环执行代码块
* do...while - 首先执行一次代码块，然后在指定的条件成立时重复这个循环
* for - 循环执行代码块指定的次数
* foreach - 根据数组中每个元素来循环代码块

# 十三、 魔术常量

* \_\_LINE__ - 当前行号
* \_\_FILE__ - 文件的完整路径和文件名。如果用在被包含文件中，则返回被包含的文件名
* \_\_DIR__ - 文件所在目录。如果用在被包含文件中，则返回被包含的文件所在的目录
* \_\_FUNCTION__ - 返回函数被定义时的名字（区分大小写）
* \_\_CLASS__ - 返回类被定义时的名字
* \_\_METHOD__ - 返回方法被定义时的名字
* \_\_NAMESPACE__ - 当前命名空间的名称

### 1、 \_\_TRAIT__
实现代码复用。  
```php

<?php
class Base {
    public function sayHello() {
        echo 'Hello ';
    }
}
 
trait SayWorld {
    public function sayHello() {
        parent::sayHello();
        echo 'World!';
    }
}
 
class MyHelloWorld extends Base {
    use SayWorld;
}
 
$o = new MyHelloWorld();
$o->sayHello();
?>
```

**获取文件名:**  
```php
<?php
echo substr(__FILE__,strlen(__DIR__)-strlen(__FILE__)+1);
?>
```

# 十四、 PHP命名空间（namespace）
解决两个问题：  

1. 用户编写的代码与PHP内部的名字冲突。  
2. 问很长的标识符创建一个别名。

### 1、 定义命名空间
多个命名空间：  
```php
<?php
namespace MyProject {
    const CONNECT_OK = 1;
    class Connection { /* ... */ }
    function connect() { /* ... */  }
}

namespace AnotherProject {
    const CONNECT_OK = 1;
    class Connection { /* ... */ }
    function connect() { /* ... */  }
}
?>
```
将全局的非命名空间中的代码与命名空间中的代码组合在一起，只能使用大括号的形式的语法。全局代码必须使用一个不带名称的namespace语句加上大括号括起来，例如：  
```php
<?php
namespace MyProject {

const CONNECT_OK = 1;
class Connection { /* ... */ }
function connect() { /* ... */  }
}

namespace { // 全局代码
session_start();
$a = MyProject\connect();
echo MyProject\Connection::start();
}
?>
```
在声明命名空间之前唯一合法的代码是用于定义源文件编码方式的 declare 语句。所有非 PHP 代码包括空白符都不能出现在命名空间的声明之前。  
```php
<?php
declare(encoding='UTF-8'); //定义多个命名空间和不包含在命名空间中的代码
namespace MyProject {

const CONNECT_OK = 1;
class Connection { /* ... */ }
function connect() { /* ... */  }
}

namespace { // 全局代码
session_start();
$a = MyProject\connect();
echo MyProject\Connection::start();
}
?>
```
以下代码会出现语法错误：  
```php
<html>
<?php
namespace MyProject; // 命名空间前出现了“<html>” 会致命错误 -　命名空间必须是程序脚本的第一条语句
?>
```

### 2、 子命名空间
```php
<?php
namespace MyProject\Sub\Level;  //声明分层次的单个命名空间

const CONNECT_OK = 1;
class Connection { /* ... */ }
function Connect() { /* ... */  }

?>
```

### 3、 命名空间的使用
PHP命名空间中的类名可以通过三种方式引用：  
1. **非限定名称，或不包含前缀的类名称，** 例如`$a = new Foo();`或`Foo::staticMethod();`。如果当前命名空间是currentnamespace，Foo将被解析为currentnamespace\Foo。如果使用Foo的代码是全局的，不包含任何命名空间中的代码，则Foo会被解析为Foo。警告：如果命名空间中的函数或常量未定义，则该非限定的函数或常量名称会被解析为全局函数名称或常量名称。
2. **限定名称，或包含前缀的名称，** 例如`$a = new subnamespace\Foo();`或`subnamespace\Foo::staticMethod();`。如果当前的名称空间是currentnamespace，则Foo会被解析为currentnamespace\subnamespace\Foo。如果使用Foo的代码是全局的，不包含任何命名空间的代码，Foo会被解析为subnamespace\Foo。
3. **完全限定名称，或包含了全局前缀操作符的名称。** 例如，`$a = new \currentnamespace\Foo();`或`\currentnamespace\Foo::staticMethod();`。在这种情况下，Foo总是被解析为代码中的文字名(literal name)currentnamespace\Foo。

### 1、 命名空间的顺序
```php
<?php
namespace A;
use B\D, C\E as F;

// 函数调用

foo();      // 首先尝试调用定义在命名空间"A"中的函数foo()
            // 再尝试调用全局函数 "foo"

\foo();     // 调用全局空间函数 "foo" 

my\foo();   // 调用定义在命名空间"A\my"中函数 "foo" 

F();        // 首先尝试调用定义在命名空间"A"中的函数 "F" 
            // 再尝试调用全局函数 "F"

// 类引用

new B();    // 创建命名空间 "A" 中定义的类 "B" 的一个对象
            // 如果未找到，则尝试自动装载类 "A\B"

new D();    // 使用导入规则，创建命名空间 "B" 中定义的类 "D" 的一个对象
            // 如果未找到，则尝试自动装载类 "B\D"

new F();    // 使用导入规则，创建命名空间 "C" 中定义的类 "E" 的一个对象
            // 如果未找到，则尝试自动装载类 "C\E"

new \B();   // 创建定义在全局空间中的类 "B" 的一个对象
            // 如果未发现，则尝试自动装载类 "B"

new \D();   // 创建定义在全局空间中的类 "D" 的一个对象
            // 如果未发现，则尝试自动装载类 "D"

new \F();   // 创建定义在全局空间中的类 "F" 的一个对象
            // 如果未发现，则尝试自动装载类 "F"

// 调用另一个命名空间中的静态方法或命名空间函数

B\foo();    // 调用命名空间 "A\B" 中函数 "foo"

B::foo();   // 调用命名空间 "A" 中定义的类 "B" 的 "foo" 方法
            // 如果未找到类 "A\B" ，则尝试自动装载类 "A\B"

D::foo();   // 使用导入规则，调用命名空间 "B" 中定义的类 "D" 的 "foo" 方法
            // 如果类 "B\D" 未找到，则尝试自动装载类 "B\D"

\B\foo();   // 调用命名空间 "B" 中的函数 "foo" 

\B::foo();  // 调用全局空间中的类 "B" 的 "foo" 方法
            // 如果类 "B" 未找到，则尝试自动装载类 "B"

// 当前命名空间中的静态方法或函数

A\B::foo();   // 调用命名空间 "A\A" 中定义的类 "B" 的 "foo" 方法
              // 如果类 "A\A\B" 未找到，则尝试自动装载类 "A\A\B"

\A\B::foo();  // 调用命名空间 "A" 中定义的类 "B" 的 "foo" 方法
              // 如果类 "A\B" 未找到，则尝试自动装载类 "A\B"
?>
```


# 十五、 PHP面向对象OOP
* 类的变量使用**var**来声明，变量也可以初始化值。

### 1、 构造函数
语法：  
```php
void __construct([mixed $args [, $...]])
```

### 2、 析构函数
语法：  
```php
void __destruct(void)
```

### 3、 继承
不支持多继承。  

### 4、 方法重写
如果父类方法不能满足子类要求，可以对其进行改写。  

### 5、 访问控制
* public
* protected
* private

类属性必须定义为public/protected/private之一，如果用var定义，则被视为public。  
方法默认为公有。  

### 6、 接口
* interface修饰接口
* 方法必须共有
* 类可以实现多个接口

### 7、 抽象类
任何一个类，如果它里面至少有一个方法被声明为抽象的，那么这个类就必须声明为抽象的。  
定义为抽象类不能实例化。  
继承一个抽象类的时候，子类必须定义父类中的所有抽象方法;另外，这些方法的访问控制必须和父类中**一样或者更为宽松**。  
子类方法可以包含父类抽象方法中不存在的可选参数。  

### 8、 static关键字
静态属性不可以有对象通过->操作符来访问。  
```php
<?php
class Foo {
  public static $my_static = 'foo';
  
  public function staticValue() {
     return self::$my_static;
  }
}

print Foo::$my_static . PHP_EOL;
$foo = new Foo();

print $foo->staticValue() . PHP_EOL;
?>    
```

### 9、 final关键字
如果父类中的方法被声明为final，则子类无法覆盖该方法;如果一个类被声明为final，则不能被继承。  

### 10、 调用父类的构造方法
**php不会在子类的构造方法中自动调用父类的构造方法。**  
使用`parent::__construct()`：  
```php
<?php
class BaseClass {
   function __construct() {
       print "BaseClass 类中构造方法" . PHP_EOL;
   }
}
class SubClass extends BaseClass {
   function __construct() {
       parent::__construct();  // 子类构造方法不能自动调用父类的构造方法
       print "SubClass 类中构造方法" . PHP_EOL;
   }
}
class OtherSubClass extends BaseClass {
    // 继承 BaseClass 的构造方法
}

// 调用 BaseClass 构造方法
$obj = new BaseClass();

// 调用 BaseClass、SubClass 构造方法
$obj = new SubClass();

// 调用 BaseClass 构造方法
$obj = new OtherSubClass();
?>
```

# 十六、 PHP标准函数

* get_class() - 返回一个对象的类名
* get_object_vars() - 得到对象的属性
* get_class_methods() - 得到类的方法名
