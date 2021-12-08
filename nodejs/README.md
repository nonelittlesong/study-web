# NodeJS

- [npm中文文档](https://www.npmjs.com.cn/)
- [用源码安装nodejs（是源码不是release）](https://www.cnblogs.com/shengtaiyuan/p/10164823.html) — 不推荐
- [JS Style](https://github.com/airbnb/javascript)

## 1. [NVM](https://github.com/nvm-sh/nvm) 安装 NodeJS

- [使用 nvm 安装 Nodejs | 知乎](https://zhuanlan.zhihu.com/p/47977487)

### 1.1. 安装和更新

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
# 或
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```

### 1.2. 使用

查看可用的 node 版本：

```
nvm ls-remote
```

安装指定版本的 node：

```
nvm install <version>
```

切换版本：

```
# 查看本地的 node 版本
nvm ls

# 设置默认版本
nvm alias default <version>

# 临时选择版本
nvm use <version>
```

## 2. 源码安装

[清华大学开源软件镜像网站](https://mirrors.tuna.tsinghua.edu.cn/)或[官网](https://nodejs.org/en/download/)  
下载**源码**压缩包并解压。  

```sh
$ ./configure
$ make
$ sudo make install
```

### 2.1. 安装版本管理器 [n](https://github.com/tj/n)：

```sh
$ sudo npm install n -g
```

```
Usage: n [options] [COMMAND] [args]

Commands:

  n                              显示安装的 Node.js 版本Display downloaded Node.js versions and install selection
  n latest                       安装最新 Node.js
  n lts                          安装最新稳定版 Node.js
  n <version>                    Install Node.js <version> (downloading if necessary)
  n install <version>            Install Node.js <version> (downloading if necessary)
  n run <version> [args ...]     Execute downloaded Node.js <version> with [args ...]
  n run <version> [args ...]     Execute downloaded node <version> with [args ...]
  n which <version>              Output path for downloaded node <version>
  n exec <vers> <cmd> [args...]  Execute command with modified PATH, so downloaded node <version> and npm first
  n rm <version ...>             Remove the given downloaded version(s)
  n prune                        Remove all downloaded versions except the installed version
  n --latest                     Output the latest Node.js version available
  n --lts                        Output the latest LTS Node.js version available
  n ls                           Output downloaded versions
  n ls-remote [version]          Output matching versions available for download
  n uninstall                    Remove the installed Node.js

Options:

  -V, --version         Output version of n
  -h, --help            Display help information
  -p, --preserve        Preserve npm and npx during install of Node.js
  -q, --quiet           Disable curl output (if available)
  -d, --download        Download only
  -a, --arch            Override system architecture
  --all                 ls-remote displays all matches instead of last 20
  --insecure            Turn off certificate checking for https requests (may be needed from behind a proxy server)
  --use-xz/--no-use-xz  Override automatic detection of xz support and enable/disable use of xz compressed node downloads.

Aliases:

  install: i
  latest: current
  ls: list
  lsr: ls-remote
  lts: stable
  rm: -
  run: use, as
  which: bin
```
## 3. [使用国内镜像](https://blog.csdn.net/qq_39207948/article/details/79449633)

```
npm config set registry https://registry.npm.taobao.org
```

查看配置：

```
$ npm config ls -l
```
