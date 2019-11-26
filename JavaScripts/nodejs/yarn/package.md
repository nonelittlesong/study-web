https://docs.npmjs.com/files/package.json  

```
{
  "name": "如果打算发布你的 package，需要 name 和 version",
  "version": "版本号",
  "description": "描述你的package",
  "keywords": "关键字，用字符串数组表示",
  "homepage": "项目主页",
  "bugs": "提交issues的tracker和email",
  "license": "许可",
  "private": true,
  
```

# name
规则：  
* 不多于214个字符
* 不能用 \. 和 \_ 开头
* 不能大写
* 不要含有URL不安全的字符

贴士：  
* 不要用与核心Node模块相同的名字
* 名字中不要带node和js
* 简练

name 可以添加 scope 前缀。  

# version
version 必须能够被 node-semver 解析。  

# bugs
```
{ "url" : "https://github.com/owner/project/issues"
, "email" : "project@hostname.com"
}
```

