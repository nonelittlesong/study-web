# TypeScript

- [TypeScript 入门教程](http://ts.xcatliu.com/)

## 1. 安装

```sh
$ npm install -g/--global typescript

# yarn
$ yarn global add typescript
```

## 2. 运行

查看全局包：

```sh
$ npm list -g --depth 0
$ yarn global list
```

### 2.1. 先编译后运行

```sh
$ npm install -g typescript
$ tsc -v
```

编译：

```sh
$ tsc hello.ts
```

运行：

```sh
$ node hello.js
```

### 2.2. 直接运行

```sh
$ npm install -g typescript
$ npm install -g ts-node
```

运行：

```sh
$ ts-node hello.ts
```
