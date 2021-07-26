# [数据类型](https://www.w3schools.com/mysql/mysql_datatypes.asp)

主要有三种数据类型：`string`，`numeric` 和 `date` & `time`。

## 1. 字符串

常用：

- `varchar`

| 数据类型 | 描述 |
| --- | --- |
| CHAR(size) | 固定长度字符串。Size 可以是 0 到 255，默认是 1。|
| VARCHAR(size) | 可变长度字符串。Size 可以是 0 到 65535。|
| BINARY(size) | 等同于 CHAR，但存储二进制字符串。Size 代表字节长度，默认 1 byte。|
| VARBINARY(size) | |
| TINYBLOB | Binary Large OBjects。最大 255 字节。|
| BLOB(size) | 最长 65535 字节。|
| MEDIUMBLOB | 最长 16777215 字节。|
| LONGBLOB | 最长 4294967295 字节。|
| TINYTEXT | 字符串，最长 255 个字符。|
| TEXT(size) | 最长 65535 字符。|
| MEDIUMTEXT | 最长 16777215 字符。|
| LONGTEXT | 最长 4294967295 字符。|
| ENUM(val1, val2, val3, ...) | 字符串，只能为其中一个值。一共可以列 65535 个值。插入不包含在列表中的值，会赋予空值。|
| SET(val1, val2, val3, ...) | 字符串，含其中 0 或多个值。一共可以列 64 个值。|

## 2. 数字

| 数据类型 | 描述 |
| --- | --- |
| 