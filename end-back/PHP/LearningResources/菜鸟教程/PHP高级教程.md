# 一、 PHP JSON
### 1、 json_encode
语法：  
```php
string json_encode($value [, $options = 0])
```
参数：  
* value - 要编码的值。该函数只对utf-8编码的数据有效
* options - 由以下常量组成的二进制掩码：JSON_HEX_QUOT, JSON_HEX_TAG, JSON_HEX_AMP, JSON_HEX_APOS, JSON_NUMERIC_CHECK,JSON_PRETTY_PRINT, JSON_UNESCAPED_SLASHES, JSON_FORCE_OBJECT

### 2、 json_decode
语法：  
```php
mixed json_decode($json_string [, $assoc = false [, $depth = 512 [, options = 0]]])
```
参数：  
* json_string - 待解码的json字符串，必须是UTF-8编码。
* assoc - 当参数为true时返回数组，为false时返回对象。
* depth - 整数类型的参数，它指定递归的深度。
* options - 二进制掩码，目前只支持JSON_BIGINT_AS_STRING。

# 二、 [PHP Session](https://www.runoob.com/php/php-sessions.html)
## 1、 开始PHP 

# 三、 [文件](https://www.runoob.com/php/php-file.html)
## 1、 打开文件
`fopen()`:  

| 模式 | 描述 |
| --- | --- |
| r | 只读。从文件的开头开始。 |
| r+ | 读/写。从文件的开头开始。 |
| w | 只写。打开并清空文件的内容;如果文件不存在，则创建新文件。 |
| w+ | 读/写。打开并清空文件的内容;如果文件不存在，则创建新文件。 |
| a | 追加。打开并向文件末尾进行写操作，如果文件不存在，则创建新文件。 |
| a+ | 读/追加。通过向文件末尾写内容，来保持文件内容。 |
| x | 只写。创建新文件。如果文件已存在，则返回false和一个错误。 |
| x+ | 读/写。创建新文件。如果文件已存在，则返回false和一个错误。 |

>注： 如过 `fopen（）` 不能打开文件，则返回0（false）。


## 2、 关闭文件
`fclose()`:  
```php
 <?php
$file = fopen("test.txt","r");

//执行一些代码

fclose($file);
?>
```

## 3、 检测文件末尾（EOF）
`feof()`:  
```php
if (feof($file)) echo "文件结尾"; 
```

## 4、 逐行读取文件
`fgets()`：  
```php
<?php
$file = fopen("welcome.txt", "r") or exit("无法打开文件!");
// 读取文件每一行，直到文件结尾
while(!feof($file))
{
    echo fgets($file). "<br>";
}
fclose($file);
?> 
```

## 5、 逐字符读取文件
`fgetc()`:  
```php
<?php
$file=fopen("welcome.txt","r") or exit("无法打开文件!");
while (!feof($file))
{
    echo fgetc($file);
}
fclose($file);
?> 
```
