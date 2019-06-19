* [php生成随机数的几种方法](https://blog.csdn.net/qq_35349114/article/details/76154765)

```php
$result = mt_rand(0, 1) ? 'pass' : 'fail';
```

## 1、 `rand()` & `mt_rand()` & 'random_int()`
* `mt_rand()`最快，`random_int()`最慢
* `random_int()`最安全
