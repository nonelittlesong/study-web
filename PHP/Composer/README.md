* https://docs.phpcomposer.com/00-intro.html  
* [Composer官网](https://getcomposer.org/download/)  
* http://packagist.laravel-china.org/

# 查看全局设置
```
composer config -gl
```

# 一、 官网推荐下载方法：  
```sh
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === '48e3236262b34d30969dca3c37281b3b4bbe3221bda826ac6a9a62d6444cdb0dcd0615698a5cbe587c3f0fe57a54d8f5') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```
## 1、 Installer Options
### --install-dir
You can install composer to a specific directory by using the --install-dir option and providing a target directory. Example:
php composer-setup.php --install-dir=bin  

### --filename
You can specify the filename (default: composer.phar) using the --filename option. Example:
php composer-setup.php --filename=composer  

### --version
You can install composer to a specific release by using the --version option and providing a target release. Example:
php composer-setup.php --version=1.0.0-alpha8  

### Preview / Snapshot Releases
By default the installer and composer self-update will download stable versions only. If you would like to help test pre-release versions you can use the --preview flag on either installer or self-update. For snapshot builds which are done from the latest Composer commit, you can use the --snapshot flag.  

## 2、 全局配置
```
$ sudo mv composer.phar /usr/local/bin/composer
```

# 二、 [镜像用法](https://pkg.phpcomposer.com/)

有两种方式启用本镜像服务：  

* 系统全局配置： 即将配置信息添加到 Composer 的全局配置文件 config.json 中。见“方法一”
* 单个项目配置： 将配置信息添加到某个项目的 composer.json 文件中。见“方法二”

## 1、 方法一： 修改 composer 的全局配置文件（推荐方式）

打开命令行窗口（windows用户）或控制台（Linux、Mac 用户）并执行如下命令：  
```
composer config -g repo.packagist composer https://packagist.phpcomposer.com
```
方法二： 修改当前项目的 composer.json 配置文件：  

打开命令行窗口（windows用户）或控制台（Linux、Mac 用户），进入你的项目的根目录（也就是 composer.json 文件所在目录），执行如下命令：  
```
composer config repo.packagist composer https://packagist.phpcomposer.com
```
上述命令将会在当前项目中的 composer.json 文件的末尾自动添加镜像的配置信息（你也可以自己手工添加）：  
```
"repositories": {
    "packagist": {
        "type": "composer",
        "url": "https://packagist.phpcomposer.com"
    }
}
```

以 laravel 项目的 composer.json 配置文件为例，执行上述命令后如下所示（注意最后几行）：  
```
{
    "name": "laravel/laravel",
    "description": "The Laravel Framework.",
    "keywords": ["framework", "laravel"],
    "license": "MIT",
    "type": "project",
    "require": {
        "php": ">=5.5.9",
        "laravel/framework": "5.2.*"
    },
    "config": {
        "preferred-install": "dist"
    },
    "repositories": {
        "packagist": {
            "type": "composer",
            "url": "https://packagist.phpcomposer.com"
        }
    }
}
```
OK，一切搞定！试一下 composer install 来体验飞一般的速度吧！  

# 三、 镜像原理：

一般情况下，安装包的数据（主要是 zip 文件）一般是从 github.com 上下载的，安装包的元数据是从 packagist.org 上下载的。  

然而，由于众所周知的原因，国外的网站连接速度很慢，并且随时可能被“墙”甚至“不存在”。  

“Packagist 中国全量镜像”所做的就是缓存所有安装包和元数据到国内的机房并通过国内的 CDN 进行加速，这样就不必再去向国外的网站发起请求，从而达到加速 composer install 以及 composer update 的过程，并且更加快速、稳定。因此，即使 packagist.org、github.com 发生故障（主要是连接速度太慢和被墙），你仍然可以下载、更新安装包。  

# 四、 解除镜象：

如果需要解除镜像并恢复到 packagist 官方源，请执行以下命令：  
```
composer config -g --unset repos.packagist
```
执行之后，composer 会利用默认值（也就是官方源）重置源地址。  

将来如果还需要使用镜像的话，只需要根据前面的“镜像用法”中介绍的方法再次设置镜像地址即可。  

