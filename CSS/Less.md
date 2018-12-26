Less是一门CSS预处理语言，它扩展了CSS，增加了变量，Mixin，函数等特性。  

# 注释
* // 只在less中显示
* /\*\*/ 会在编译好的css文件中显示

# 变量
* 定义变量用@  
  * less中的写法：  
    ```css
    @ly_width: 100px;
    .box {
        width: @ly_width;
    }
    ```
  * 编译后在css显示的是:  
    ```css
    .box {
        width: 100px;
    }
    ```
  
# 混合
* 不带参数的混合:  
  ```less
  @ly_width: 100px;
  @ly_height: 200px;
  @ly_color: green;
  .border {
      border: 1px solid red;
  }
  .one {
      width: @ly_width;
      height: @ly_height;
      background-color: @ly_color;
      .border;
  }
  ```
* 带参数的混合（不带默认值）：  
  ```less
  @ly_width: 100px;
  @ly_height: 200px;
  @ly_color: green;
  .border(@border_width) {
      border: @border_width solid red;
  }
  .one {
      width: @ly_width;
      height: @ly_height;
      background-color: @ly_color;
      .border(1px);
  }
  ```
  
* 带参数的混合（带默认值）：  
  ```less
  @ly_width: 100px;
  @ly_height: 200px;
  @ly_color: green;
  .border(@border_width：3px;) {
      border: @border_width solid red;
  }
  .one {
      width: @ly_width;
      height: @ly_height;
      background-color: @ly_color;
      .border();
  }
  ```
  
# 运算
运算提供了加减乘除操作，还可以做属性值和颜色的运算：  
```less
@ly_width: 100px;
.one {
    width: @ly_width + 100;
}
```

# 嵌套
个人不喜欢嵌套。  
可以在一个选择器中嵌套另一个选择器：  
```less
@ly_width: 100px;
@ly_height: 200px;
@ly_color: red;
.one {
    width: @ly_width;
    height: @ly_height;
    background-color: @ly_color;
    .two {
        background-color: green;
    }
}
```
### 1. &
&代表上一层选择器的名字。  


# @arguments
可以包含所有的参数一起处理：  
```less
.border(@border_width;@border_style;@border_color) {
    border: @arguments;
}
.one {
    .border(1px;solid;red);
}
```

# 匹配模式
```less
//定义上,下,左,右边框的样式
.border(top;@border_width:5px;@border_color:red){
    border-top:@border_width solid @border_color;
}
.border(bottom;@border_width:5px;@border_color:red){
    border-bottom:@border_width solid @border_color;
}
.border(left;@border_width:5px;@border_color:red){
    border-left:@border_width solid @border_color;
}
.border(right;@border_width:5px;@border_color:red){
    border-right:@border_width solid @border_color;
}
//如果想写通用的样式 可以在下面的代码中写 格式是固定的 
.border(@_,@border_width:5px;@border_color:red){
    border-color:yellow;
}
.border_use1 {
    //选择和if差不多 如果是left就调用上面对应的
    .border(left);
}
.border_use2 {
    //选择和if差不多 如果是right就调用上面对应的
    .border(right);
}
```
