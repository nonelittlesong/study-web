参考：  
* https://blog.csdn.net/xujunabc999/article/details/52869959  
* https://www.jianshu.com/p/89a339978b03
* https://blog.csdn.net/xiao_zhui/article/details/72556781
* https://blog.csdn.net/lw18813056061/article/details/81975245
* https://blog.csdn.net/wzhwho/article/details/6949297

方式：  
* 动态加载 so 库 - 利用 `ext_skel` 工具编译生成so模块，修改 php.ini 文件，动态加载即可。
* 静态编译 - 将编写的模块静态编译到 PHP，需要重新编译 PHP。

基本流程：  
![php_extension.jpg](https://github.com/nonelittlesong/study-resources/blob/master/images/PHP/php_extension.jpg)


## 1、 `ext_skel`
下载[源码](https://www.php.net/downloads.php)并解压。  

php 源码编译安装：  
```
./configure --prefix=/usr/local/php --with-curl --with-freetype-dir --with-gd \
--with-gettext --with-iconv-dir --with-kerberos --with-libdir=lib64 --with-libxml-dir \
--with-mysqli --with-openssl --with-pcre-regex --with-pdo-mysql --with-pdo-sqlite --with-pear \
--with-png-dir --with-jpeg-dir --with-xmlrpc --with-xsl --with-zlib --with-bz2 --with-mhash \
--enable-fpm --enable-bcmath --enable-libxml --enable-inline-optimization --enable-gd-native-ttf \
--enable-mbregex --enable-mbstring --enable-opcache --enable-pcntl \
--enable-shmop --enable-soap --enable-sockets --enable-sysvsem --enable-sysvshm --enable-xml --enable-zip
```

进入 ext 目录：  
```
$ cd php-7.3.7/ext
```
利用 `ext_skel` 生成基本代码：  
```

