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

# 进阶配置
## 1、 将二进制文件安装到系统上：  
```
$ sudo make install
```

## 2、 配置 `redis.conf`
创建一个配置目录 `/etc/redis`:  
```
$ sudo mkdir /etc/redis
```
复制配置文件：  
```
$ sudo cp redis-5.0.5/redis.conf /etc/redis
```
修改配置文件：  
```
$ sudo vim /etc/redis/redis.conf
```
找到 `supervised` 指令。将 `no` 改为 `systemd`：  
```sh
. . .

# If you run Redis from upstart or systemd, Redis can interact with your
# supervision tree. Options:
#   supervised no      - no supervision interaction
#   supervised upstart - signal upstart by putting Redis into SIGSTOP mode
#   supervised systemd - signal systemd by writing READY=1 to $NOTIFY_SOCKET
#   supervised auto    - detect upstart or systemd method based on
#                        UPSTART_JOB or NOTIFY_SOCKET environment variables
# Note: these supervision methods only signal "process is ready."
#       They do not enable continuous liveness pings back to your supervisor.
supervised systemd

. . .
```
找到 `dir` 指令，将 `./` 改为 `/var/lib/redis`。此选项指定 redis 将用于转储持久性数据的目录。  
```sh
. . .

# The working directory.
#
# The DB will be written inside this directory, with the filename specified
# above using the 'dbfilename' configuration directive.
#
# The Append Only File will also be created inside this directory.
#
# Note that you must specify a directory here, not a file name.
dir /var/lib/redis

. . .
```

## 3、 创建 `redis.service`
创建并打开 `redis.service`:  
```
sudo vim /lib/systemd/system/redis.service
```
编辑如下内容：  
```sh
[Unit]
Description=Redis In-Memory Data Store
After=network.target

[Service]
User=redis
Group=redis
ExecStart=/usr/local/bin/redis-server /etc/redis/redis.conf
ExecStop=/usr/local/bin/redis-cli shutdown
Restart=always

[Install]
WantedBy=multi-user.target
```

## 4、 创建 redis 用户和组
```
sudo adduser --system --group --no-create-home redis
```
创建前面提到的 `dir` 目录：  
```
sudo mkdir /var/lib/redis
```
权限配置：  
```
sudo chown -R redis:redis /var/lib/redis
sudo chmod -R 770 /var/lib/redis
```

## 5、 启动服务
启动：  
```
sudo systemctl start redis
```
查看状态：  
```
sudo systemctl status redis
```
开机启动：  
```
sudo systemctl enable redis
# 输出
Created symlink from /etc/systemd/system/multi-user.target.wants/redis.service to /lib/systemd/system/redis.service.
```

## 6、 测试
运行内置的客户端：  
```
redis-cli
127.0.0.1:6379> ping
PONG
127.0.0.1:6379> set test "It's working!"
OK
127.0.0.1:6379> get test
"It's working!"
127.0.0.1:6379> exit
```

重启 redis：  
```
sudo systemctl restart redis
```
重启客户端：  
```
redis-cli
```
仍可得到 test 的值：  
```
127.0.0.1:6379> get test
"It's working!"
```

