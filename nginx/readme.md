# nginx

- [nginx-flask](https://github.com/nonelittlesong/study-python/blob/master/Flask/Deploy/readme.md)  

## 一、[Nginx 命令行参数](http://nginx.org/en/docs/switches.html)
- `-? | -h` — 打印帮助文档  
- `-c file` — 使用指定的配置文件，而不是默认文件  
- `-g directives` — 设置全局的配置指令，例如，  
  >`nginx -g "pid /var/run/nginx.pid; worker_processes `sysctl -n hw.ncpu`;"  
- `-p prefix` — 设置 nginx 路进前缀，i.e. 保存服务器文件的目录（默认 `/usr/local/nginx`）  
- `-q` — 测试配置文件时，不打印非错误信息  
- `-s signal` — 向主进程发送信号，包括：  
  - `stop` — 强制关闭  
  - `quit` — 优雅地关闭  
  - `reload` — 重载配置，优雅地关闭旧进程，用新配置开启新进程  
  - `reopen` — 重新打开 log 文件  
- `-t` — 测试配置文件：检查语法正确性，然后尝试打开配置中涉及的文件  
- `-T` — 和 `-t` 一样，额外将配置文件 dump 到标准输出  
- `-v` — 打印 nginx 版本  
- `-V` — 打印 nginx 版本，编译器版本，配置参数  
