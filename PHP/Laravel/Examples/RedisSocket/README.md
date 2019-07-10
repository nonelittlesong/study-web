# 环境
* ubuntu16.04
* nginx 1.10.3
* php 7.3.6
* node 10.15.3
* npm 6.9.2
* redis 5.0.5
* laravel 5.8

依赖包：  
* `sudo npm install -g laravel-echo-server`
* `composer require predis/predis`
* `npm install --save socket.io-client`
* `npm install --save laravel-echo

# 广播架构
redis + socket.io 方案：  
* laravel-echo-server - 使用 socket.io 机制实现的 broadcasting 服务端。
* laravel-echo - laravel-echo是 laravel broadcasting 的客户端。 laravel-echo 有两种连接机制可选： pusher 和 socket.io。
* socket.io - websocket 的一种nodejs实现。 laravel-echo 如果使用 socket.io 则须先安装 socket.io-client。
* predis - redis 客户端的 php 实现。
* Laravel Event - 广播事件类。
* Laravel Queue - 广播机制是基于 queue 机制来实现的。
* Redis Pub/Sub - redis的订阅机制。laravel-echo-server本质上只是一个Redis订阅服务的订阅者。

