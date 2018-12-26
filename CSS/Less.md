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
  
