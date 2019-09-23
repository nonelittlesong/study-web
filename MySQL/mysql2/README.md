
- [mysql2 github](https://github.com/sidorares/node-mysql2#readme)
- [How can prepared statements protect from SQL injection attacks?](https://stackoverflow.com/questions/8263371/how-can-prepared-statements-protect-from-sql-injection-attacks)
- [mysql2 npm](https://www.npmjs.com/package/mysql2)

安装： `yarn add mysql2`。  

## 一、 连接池
通过复用已有连接，减少连接时间。  
`CURD` 后保持连接（不用关闭）。  

```js
// Get the client
const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
```

和 `connection` 一样使用 `pool`：  
```js
// For pool initialization, see above
pool.query("SELECT field FROM atable", function(err, rows, fields) {
   // Connection is automatically released when query resolves
})
```

## 二、 [Promise Wrapper](https://github.com/sidorares/node-mysql2/blob/master/documentation/Promise-Wrapper.md)
```js
'use strict';

const mysql = require('mysql2/promise');

async function test() {
  const c = await mysql.createConnection({
    port: 3306,
    user: 'testuser',
    namedPlaceholders: true,
    password: 'testpassword'
  });
  console.log('connected!');
  const [rows, fields] = await c.query('show databases');
  console.log(rows);

  try {
    const [rows, fields] = await c.query('some invalid sql here');
  } catch (e) {
    console.log('caught exception!', e);
  }

  console.log(await c.execute('select sleep(0.5)'));
  console.log('after first sleep');
  console.log(await c.execute('select sleep(0.5)'));
  console.log('after second sleep');
  let start = +new Date();
  console.log(
    await Promise.all([
      c.execute('select sleep(2.5)'),
      c.execute('select sleep(2.5)')
    ])
  );
  console.log(
    'after 2+3 parallel sleep which is in fact not parallel because commands are queued per connection'
  );
  let end = +new Date();
  console.log(end - start);
  await c.end();

  const p = mysql.createPool({
    port: 3306,
    user: 'testuser',
    namedPlaceholders: true,
    password: 'testpassword'
  });
  console.log(await p.execute('select sleep(0.5)'));
  console.log('after first pool sleep');
  start = +new Date();
  console.log(
    await Promise.all([
      p.execute('select sleep(2.5)'),
      p.execute('select sleep(2.5)')
    ])
  );
  console.log('after 2+3 parallel pool sleep');
  end = +new Date();
  console.log(end - start);
  await p.end();
}

test()
  .then(() => {
    console.log('done');
  })
  .catch(err => {
    console.log('error!', err);
    throw err;
  });
```
