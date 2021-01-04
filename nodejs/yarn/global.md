# global

全局安装

```sh
yarn global <add/bin/list/remove/upgrade> [--prefix]
```

>**注意**，不像 npm 里的 --global 标志，yarn 的 `global` 必须跟在 `yarn` 的后面。

例如，全局安装 create-react-app

```sh
$ yarn global add create-react-app --prefix /usr/local
# `create-react-app` 命令目前可用于全局：
$ which create-react-app
$ /usr/local/bin/create-react-app
$ create-react-app
```

## 1. 定义安装位置

查看全局二进制包位置：

```sh
yarn global bin
```

设置全局二进制包位置：

```sh
yarn config set prefix <filepath>

// 例如
yarn config set prefix ~/.yarn
// 将把所有全局二进制包安装到 ~/.yarn/bin
```

查看全局 `node_module` 位置：

```sh
yarn global dir
```

## 2. 可以和 global 一起使用的命令

- [yarn add](https://classic.yarnpkg.com/zh-Hans/docs/cli/add) — 添加一个包用在你当前的项目里
- [yarn bin](https://classic.yarnpkg.com/zh-Hans/docs/cli/bin) — 显示 yarn bin 目录的位置
- [yarn list](https://classic.yarnpkg.com/zh-Hans/docs/cli/list) — 列出已安装的包
- [yarn remove](https://classic.yarnpkg.com/zh-Hans/docs/cli/remove) — 删除一个包
- [yarn upgrade](https://classic.yarnpkg.com/zh-Hans/docs/cli/upgrade) — 基于指定的范围，把包升级到最新版本
- [yarn upgrade-interactive](https://classic.yarnpkg.com/zh-Hans/docs/cli/upgrade-interactive) — 允许用户选择升级哪些包
