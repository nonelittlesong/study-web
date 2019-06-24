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
