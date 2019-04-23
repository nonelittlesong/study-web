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

# PHP创建表
```php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname - "myDBPDO";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
  // 使用sql创建table
  $sql = "create table MyGuests (
            id INT(6) unsigned auto_increment primary key,
            firstname varchar(30) not null,
            lastname varchar(30) not null,
            email varchar(50),
            reg_date TIMESTAMP
          )";
  
  // 使用exec()，没有结果返回
  $conn->exec($sql);
  echo "数据表 MyGuests 创建成功";
} catch (PDOException $e) {
  echo $sql . "<br>" . $e->getMessage();
}

$conn = null;
?>
```

# 三、 MySQL插入
```php
$sql = "insert into MyGuests (firstname, lastname, email)
        values ('John', 'Doe', 'john@example.com')";
```

# 四、 插入多条数据
```php
<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDBPDO";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
  // 开始事务
  $conn->beginTransaction();
  
  // SQL语句
  $conn->exec("INSERT INTO MyGuests (firstname, lastname, email) 
               VALUES ('John', 'Doe', 'john@example.com')");
  $conn->exec("INSERT INTO MyGuests (firstname, lastname, email) 
               VALUES ('Mary', 'Moe', 'mary@example.com')");
  $conn->exec("INSERT INTO MyGuests (firstname, lastname, email) 
               VALUES ('Julie', 'Dooley', 'julie@example.com')");
               
  // 提交事务
  $conn->commit();
  
  echo "新记录插入成功;
} catch (PDOException $e) {
  // 如果执行失败回滚
  echo $sql . "<br>" . $e->getMessage();
}

$conn = null;
?>
```

# 五、 预处理
