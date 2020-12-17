# NodeJS

JS 后端语言！

- [菜鸟教程](https://www.runoob.com/nodejs/nodejs-tutorial.html)
- [npm中文文档](https://www.npmjs.com.cn/)
- [用源码安装nodejs（是源码不是release）](https://www.cnblogs.com/shengtaiyuan/p/10164823.html)
- [JS Style](https://github.com/airbnb/javascript)

## 1. 安装 nodejs

### 1.1. [nvm](https://github.com/nvm-sh/nvm)

- [使用 nvm 安装 Nodejs | 知乎](https://zhuanlan.zhihu.com/p/47977487)

#### 1.1.1. 安装和更新

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
# 或
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```

#### 1.1.2. 使用



### 1.2. 源码安装

[清华大学开源软件镜像网站](https://mirrors.tuna.tsinghua.edu.cn/)或[官网](https://nodejs.org/en/download/)  
下载**源码**压缩包并解压。  

```sh
$ ./configure
$ make
$ sudo make install
```

安装 [n](https://github.com/tj/n)：

```sh
$ sudo npm install n -g
```

## 2. [使用国内镜像](https://blog.csdn.net/qq_39207948/article/details/79449633)

```
npm config set registry https://registry.npm.taobao.org
```

查看配置：

```
$ npm config ls -l
```
