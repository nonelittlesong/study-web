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
  $conn->rollback();
  echo $sql . "<br>" . $e->getMessage();
}

$conn = null;
?>
```

# 五、 预处理
```php
<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDBPDO";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  // 设置 PDO 错误模式为异常
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
  // 预处理SQL并绑定参数
  $stmt = $conn->prepare("insert into MyGuest (firstname, lastname, email)
                          values (:firstname, :lastname, :email)");
  $stmt->bindParam(':firstname', $firstname);
  $stmt->bindParam(':lastname', $lastname);
  $stmt->bindParam('email', $email);
  
  // 插入行
  $firstname = "John";
  $lastname = "Doe";
  $email = "john@example.com";
  $stmt->execute();
 
  // 插入其他行
  $firstname = "Mary";
  $lastname = "Moe";
  $email = "mary@example.com";
  $stmt->execute();
 
  // 插入其他行
  $firstname = "Julie";
  $lastname = "Dooley";
  $email = "julie@example.com";
  $stmt->execute();
  
  echo "新记录插入成功";
}
catch(PDOException $e) {
  echo "Error: " . $e->getMessage();
}

$conn = null;
?>
```

# 六、 查询
```php
<?php
echo "<table style='border: solid 1px black;'>";
echo "<tr><th>Id</th><th>Firstname</th><th>Lastname</th></tr>";
 
class TableRows extends RecursiveIteratorIterator {
    function __construct($it) { 
        parent::__construct($it, self::LEAVES_ONLY); 
    }
 
    function current() {
        return "<td style='width:150px;border:1px solid black;'>" . parent::current(). "</td>";
    }
 
    function beginChildren() { 
        echo "<tr>"; 
    } 
 
    function endChildren() { 
        echo "</tr>" . "\n";
    } 
} 
 
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDBPDO";
 
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT id, firstname, lastname FROM MyGuests"); 
    $stmt->execute();
 
    // 设置结果集为关联数组
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
    foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) { 
        echo $v;
    }
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
echo "</table>";
?>
```
