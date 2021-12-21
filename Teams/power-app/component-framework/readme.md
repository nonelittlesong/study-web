# PCF

包括三部分：

1. `Manifest` — 描述元数据
2. `Component implementation`
   - 必须有一个 `index.ts`
   - 包含控制声明周期的方法 `init`, `updateView` 和 `destroy`
3. `Resources` — `manifest` 中涉及到的静态资源
   - 如 css、code、img、html 等

资源：

- [cassiebreviu/PowerAppsComponent](https://github.com/cassiebreviu/PowerAppsComponent)

## 1. [安装 Power Platform CLI](https://docs.microsoft.com/zh-cn/powerapps/developer/data-platform/powerapps-cli)

- VS Code 插件
- 独立的 CLI
