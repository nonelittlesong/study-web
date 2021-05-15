# electron-builder.yml

- [YAML官网](https://yaml.org/)
- [Common Configuration](https://www.electron.build/configuration/configuration)
- [electron-builder 打包见解 | 掘金](https://juejin.im/post/5bc53aade51d453df0447927)

## 配置

### extraResources

- [electron-builder is not bundling the python files | stackoverflow](https://stackoverflow.com/questions/51182226/electron-builder-is-not-bundling-the-python-files)
- [Cannot get asar-unpack to work | #390](https://github.com/electron-userland/electron-builder/issues/390)
- [Run python script in Electron app | stackoverflow](https://stackoverflow.com/questions/41199981/run-python-script-in-electron-app)

fields：

- from — 匹配需要拷贝的文件
- to — 目标路径

相对于项目目录的[文件通配符](https://www.electron.build/file-patterns)，把文件或目录拷贝到应用的资源目录（MacOS是 `Contents/Resources`，Linux 和 Windows 是 `resources`）。

### extraFiles

和 `extraResources` 相同，但是将文件拷贝到应用的内容目录中（MacOS 是 `Content`，Linux 和 Windows 是 root 目录）。

### asar

- `asar = true` — 将源代码打包进 `archive`
- `smartUnpack = true` — 自动 unpack 可执行文件
- `ordering` — String
- `asarUnpack` — `Array<String>`，不压缩进 asar 中的文件。
