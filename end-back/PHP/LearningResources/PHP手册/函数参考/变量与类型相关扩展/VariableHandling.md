# [Variable handling 函数](https://www.php.net/manual/zh/ref.var.php)
## isset
说明：  
```php
isset(mixed $var[, mixed $...]): bool
```
检测变量是否设置，并且不是null。  
如果已经使用`unset()`释放了一个变量之后，它将不再是isset()。  
字符'\\0'不等同于PHP的NULL。  
如果一次传入多个参数，那么 isset() 只有在全部参数都以被设置时返回 TRUE 计算过程从左至右，中途遇到没有设置的变量时就会立即停止。  
