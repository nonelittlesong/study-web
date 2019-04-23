# 一、 PHP连接MySQL
### 1、 连接
```php
<?php
$servername = "localhost";
$username = "username";
$password = "password";

try {
  $conn = new PDO("mysql:host=$servername;", $username, $password);
  echo "连接成功";
} catch (PDOException $e) {
  echo $e->getMessage();
}
?>
```

### 2、 关闭
```php
$conn = null
```

# 二、 PHP创建数据库
```php
<？php
$servername = "localhost";
$username = "username";
$password = "password";

try {
  $conn = new PDO("mysql:host=$servername", $username, $password);
  
  // 设置PDO错误模式为异常
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $sql = "CREATE DATABASE myDBPDO";
  
  // 使用exec()，因为没有结果返回
  $conn->exec($sql);
  
  echo "数据库创建成功<br>";
} catch (PDOException $e) {
  echo $sql . "<br>" . $e->getMessage();
}

$conn = null;
?>
```
