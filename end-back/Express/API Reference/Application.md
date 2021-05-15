# Methods
## app.use()
挂载中间件。  

### 语法：  
```
app.use([path,] callback[, callback..])
```

### 参数：  
* path - 默认'/'
  * 表述路径的字符串
  * path pattern
  * 正则
  * 上面构成的数组
* callback
  * 中间件
  * 多个中间件
  * 中间件数组
  * 上面的混合形式
  
### 描述：  
* 中间件会挂载到路径和子路径。  
* 中间件会按顺序执行，包含中间件的顺序很重要。


### `express.static`中间件：  
加载静态资源：  
```js
// GET /style.css etc
app.use(express.static(__dirname + '/public'));
```
