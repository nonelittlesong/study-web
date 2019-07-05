火焰图  

# 用途
可视化函数的CPU占用时间。  

# 创建
* [0x](https://www.npmjs.com/package/0x)
* perf

## [sysctl](https://www.cyberciti.biz/faq/reload-sysctl-conf-on-linux-using-sysctl/)
The sysctl command is used to modify Linux kernel variables at runtime.  
The variables are read and write from /proc/sys/ location using procfs.  

**查看某个变量：**  
```
$ sysctl variable
```

**查看所有变量：**  
```
$ sysctl -a
$ sysctl -a | grep krnel
$ sysctl -a | more
```

**在命令行写入变量：**  
```
# sysctl -w variable=value
```
临时的，`reboot server`后会恢复。  

**重新加载所有系统配置文件：**  
```
# sysctl --system
```
以下配置文件会reload：  
* `/run/sysctl.d/*.conf`
* `/etc/sysctl.d/*.conf`
* `/usr/local/lib/sysctl.d/*.conf`
* `/usr/lib/sysctl.d/*.conf`
* `/lib/sysctl.d/*.conf`
* `/etc/sysctl.conf`

**持久化配置:**  
编辑 `/etc/sysctl.conf`:  
```
# vi /etc/sysctl.conf
```
保存文件后运行:  
```
# sysctl -p
```

## perf（不好用，不如用0x）
1. `sudo apt install linux-tools-common`
2. 运行 `perf`，安装提示中缺失的内核模块。
3. `sudo sysctl -w kernel.perf_event_paranoid=-1`
4. `perf record -e cycles:u -g -- node --perf-basic-prof app.js`
5. `perf script > perfs.out`
6. `npm i -g stackvis`
7. `stackvis perf < perfs.out > flamegraph.htm`
