在需要可迭代对象的元素作为参数的函数中，把可迭代对象拆散。  

# 语法
函数调用：  
```
myFunction(...iterableObj);
```

数字或字符串：  
```
[...iterableObj, '4', 'five', 6];
```

对象(new in ECMAScript 2018)：  
```
let objClone = { ...obj };
```
