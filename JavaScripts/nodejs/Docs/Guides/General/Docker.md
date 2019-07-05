[Docker](https://docs.docker.com/install/) allows you to package an application with its environment and all of its dependencies into a "box", called a container.  

# 一、 创建 App
创建一个目录存放所有文件，在这个下新建 `package.json` 文件：  
```
{
  "name": "docker_web_app",
  "version": "1.0.0",
  "description": "Node.js on Docker",
  "author": "First Last <first.last@example.com>",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.16.1"
  }
}
```

编写 `server.js`:  
```js
'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
    res.send('Hello world\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
```


# 二、 创建 Dockerfile
* [Building Efficient Dockerfiles](http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/)

编写 `Dockerfile` 文件：  
```
FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]
```

编写 `.dockerignore` 文件：  
```
node_modules
npm-debug.log
```

# 创建镜像
```
$ docker build -t your-favorite-name .
```
查看镜像：  
```
docker images
```

# 运行镜像
选项：  
* `-d` - 用独立模式运行 container ，让 container 在后台运行。
* `-p` - 将公共端口重定向到私有端口。

```
$ docker run -p 49160:8080 -d your-favorite-name
```

打印程序的输出：  
```
# Get container ID
$ docker ps

# Print app output
$ docker logs <container id>

# Example
Running on http://localhost:8080
```

`exec` 进入 container
```
$ docker exec -it <container id> /bin/bash
```

# 测试
```
curl -i localhost:49160
```

