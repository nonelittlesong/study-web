##  TypeError: CleanWebpackPlugin is not a constructor
最新的需要进行解构,即  
```
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
```
如果什么都不配置默认删除未使用的资源。  
