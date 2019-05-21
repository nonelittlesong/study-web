* https://docs.phpcomposer.com/00-intro.html  
* [Composer官网](https://getcomposer.org/download/)  


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


