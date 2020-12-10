# 开启 Inspector
```
node --inspect
```
Inspector clients must know and specify host address, port, and UUID to connect.  

# 安全
[如何安全地允许远程调试](https://nodejs.org/en/docs/guides/debugging-getting-started/#enabling-remote-debugging-scenarios)  

本地应用能够完全访问 `inspector`。  

# Inspector Clients
* [node-inspect](https://github.com/nodejs/node-inspect)
* [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend)
* [Visual Studio Code](https://github.com/microsoft/vscode)
* [Visual Studio](https://github.com/Microsoft/nodejstools)
* [WebStorm](https://www.jetbrains.com/webstorm/)
* [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)
* [gitpod](https://www.gitpod.io/)

# 命令行选项
https://nodejs.org/api/debugger.html  

`node inspect script.js`:  
* Spawn child process to run user's script under --inspect flag; and use main process to run CLI debugger.  

# 远程调试
Let's say you are running Node on remote machine, remote.example.com, that you want to be able to debug. On that machine, you should start the node process with the inspector listening only to localhost (the default).  
```
$ node --inspect server.js
```
Now, on your local machine from where you want to initiate a debug client connection, you can setup an ssh tunnel:  
```
$ ssh -L 9221:localhost:9229 user@remote.example.com
```
