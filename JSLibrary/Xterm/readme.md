# [Xterm](https://xtermjs.org/)

资源：

- [ysk2014/webshell | github](https://github.com/ysk2014/webshell)
- [juanlao7/remolacha | github](https://github.com/juanlao7/remolacha)
- [alemures/ssh-manager | github](https://github.com/alemures/ssh-manager)
- [wonderful-panda/inazuma | github](https://github.com/wonderful-panda/inazuma)

## 开始

安装：

```
$ npm install xterm
# or
$ yarn add xterm
```

```html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="node_modules/xterm/css/xterm.css" />
    <script src="node_modules/xterm/lib/xterm.js"></script>
  </head>
  <body>
    <div id="terminal"></div>
    <script>
      var term = new Terminal();
      term.open(document.getElementById('terminal'));
      term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
    </script>
  </body>
</html>
```

## [编码](https://xtermjs.org/docs/guides/encoding/)

### Input

`Terminal.write` 支持的编码类型：

- `string` 翻译为 `UTF-16`
- `Uint8Array` 为 `UTF-8`

### Output

- `Terminal.onData`  
  包含真实的字符数据， `payload` 被视为 `UTF-16/UCS-2`。用于系统交互，需转为 `UTF-8`（node-pty 自动完成）。
- `Terminal.onBinary`

## [流控制](https://xtermjs.org/docs/guides/flowcontrol/)

