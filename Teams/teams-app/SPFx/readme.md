# SPFx(SharePoint Framework) APP

## 要求

- Node.js v10/12/14
- An M365 account。从 [M365 developer program](https://developer.microsoft.com/en-us/microsoft-365/dev-program) 获得免费账户
- [Graph Exploer](https://developer.microsoft.com/en-us/graph/graph-explorer)
- [Developer Portal](https://dev.teams.microsoft.com/home)

## 使用

1. 安装最新的 Node.js LTS 14.x (SPFx v1.12.1 支持 Node.js v10/12/14)
2. 安装 VS Code 和 Teams Toolkit Extension 或者安装 TeamsFx CLI.
3. 打开项目，点击 `Provision in the cloud`

   或者使用 TeamsFx CLI 运行指令：`teamsfx provision`

4. 构建并部署 SharePoint 包：
    - 点击 `Deploy to the cloud` 或者在命令版选择 `Teams: Deploy to the cloud`。将sharepoint/solution 文件夹下生成一个 SharePoint 包(*.sppkg)。
  
      或者运行指令：`teamsfx deploy`

    - 构建 *.sppkg 之后，Teams Toolkit 上传并部署到 App Catalog。只有管理员可以这样做。你可以创建测试用户：[Setup your Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)。
5. 返回 Teams Toolkit 扩展，点击 `Teams: Publish to Teams`

   或者运行命令 `teamsfx publish`

   你将在 [Microsoft Teams admin center](https://admin.teams.microsoft.com/policies/manage-apps) 找到你的应用。选择应用，在发布状态栏选择发布。

6. 发布后可能需要等待几分钟。登录 Teams，在 `Apps - Built for {your-tenant-name}` 目录找到你的应用。

7. 将应用添加到个人或团队

## 调试

- `Teams workbench` 是默认的配置。使用 Teams 上下文。
- `Local workbench` 将解决方案部署到租户前，进行本地调试。
- `Hosted workbench` 需要编辑 [launch.json](.vscode/launch.json)，`enter-your-SharePoint-site` 替换为你的 SharePoint 站点，如 `https://{your-tenant-name}.sharepoint.com/sites/{your-team-name}/_layouts/workbench.aspx`。

## 引用

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
