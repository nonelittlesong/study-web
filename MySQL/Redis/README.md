* [redis.io](https://redis.io/)


# 官方安装
下载，解压并编译 Redis：  
```
# curl -O 也可以
$ wget http://download.redis.io/releases/redis-5.0.5.tar.gz
$ tar zxvf redis-5.0.5.tar.gz
$ cd redis-5.0.5
$ make
```

二进制文件在 src 目录下，运行：  
```
$ src/redis-server
```

使用内置的客户端：  
```
$ src/redis-cli
redis> set foo bar
OK
redis> get foo
"bar"
```
