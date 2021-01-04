# [npm install](https://blog.csdn.net/qq_30378229/article/details/78463930)

## 1、 npm install X:

* 会把X包安装到node_modules目录中
* 不会修改package.json
* 之后运行npm install命令时，不会自动安装X

## 2、 npm install X --save:

* 会把X包安装到node_modules目录中
* 会在package.json的dependencies属性下添加X
* 之后运行npm install命令时，会自动安装X到node_modules目录中
* 之后运行`npm install --production`或者注明NODE_ENV变量值为production时，会自动安装msbuild到node_modules目录中

## 3、 npm install X --save-dev:

* 会把X包安装到node_modules目录中
* 会在package.json的devDependencies属性下添加X
* 之后运行npm install命令时，会自动安装X到node_modules目录中
* 之后运行`npm install --production`或者注明NODE_ENV变量值为production时，不会自动安装X到node_modules目录中

## 4、 使用原则:

运行时需要用到的包使用`--save`，否则使用`--save-dev`。  

