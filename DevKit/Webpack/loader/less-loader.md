

## Troubleshot

### Enable inline javascript in less

```
{
  test: /\.less$/,
  use: [{
    loader: "style-loader"
  }, {
    loader: "css-loader"
  }, {
    loader: "less-loader",
    options: {
      javascriptEnabled: true
    }
  }]
}
```

### 以模块的形式导入

- [How do I make “import * as style from from X.less” work?](https://stackoverflow.com/questions/57635943/how-do-i-make-import-as-style-from-from-x-less-work)  
- [使用webpack加载less文件，无法在页面上显示出来](https://segmentfault.com/q/1010000011915034)  

