一种特殊的语法可以更舒适地与promise协同工作。  

# Async 方法
```js
async function f() {
    return 1;
}
```
`async` 表明该函数总返回一个 `promise`。  
非 `promise` 返回值会自动转化成 `promise`。  
```js
f().then(alert); // 1
```
显式返回一个 `promise`：  
```js
async function f() {
    return Promise.resolve(1);
}

f().then(alert);
```

# Await
**`await` 只能在 `async` 函数内使用：**  
```js
async function f() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 1000)
    });
    
    let result = await promise; // 知道promise返回一个resolve值
    
    alert(result);
}

f();
```
>**注**： `await` 不占用CPU资源，js引擎可以同时执行其它工作。  

## 1、 使用 `await` 替代 `.then`
```js
/**
 * 使用 .then
 */
function loadJson(url) {
    return fetch(url)
        .then(response => response.json());
}
function loadGithubUser(name) {
    return fetch(`https://api.github.com/users/${name}`)
        .then(response => response.json());
}
function showAvatar(githubUser) {
    return new Promise(function(resolve, reject) {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = 'promise-avatar-example';
        document.body.append(img);
        
        setTimeout(() => {
            img.remove();
            resolve(githubUser);
        }, 3000);
    });
}
// Use them:
loadJson('/article/promise-chaining/user.json')
    .then(user => loadGithubUser(user.name))
    .then(showAvatar)
    .then(githubUser => alert(`Finished showing ${githubUser.name}`));
    // ...

/**
 * 使用 await
 */
async function showAvator() {
    // 读取 JSON
    let response = await fetch('/article/promise-chaining/user.json');
    let user = await response.json();
    
    // 读取 github 用户
    let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
    let githubUser = await githubResponse.json();
    
    // 显示头像
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);
    
    // 等待三秒
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    
    img.remove();
    
    return githbuUser;
}
showAvatar();
```

## 2、 不能在顶级作用域中使用 `await`
使用匿名 `async` 函数：  
```js
(async () => {
    let response = await fetch('/article/promise-chaining/user.json');
    let user = await response.json();
})();
```

## 3、 `await` 接受 `thenables`
```js
class Thenable {
   constructor(num) {
       this.num = num
   }
   then(resolve, reject) { // 将 resolve， reject 作为参数的 then 方法
       alert(resolve) // function() {native code}
       // 1000ms后将this.num*2作为resolve值
       setTimeout(()=> {resolve(this.num * 2), 1000})
   }
}
async function(f) {
   // 等待1s，result变为2
   let result = await new Thenable(1)
   alert(result)
}
f()
```

## 4、 `async` 类方法
```js
class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}

new Waiter()
    .wait()
    .then(alert); // 1
```

# 错误处理
`reject` 相当于 `throw` 语句：  
```js
async function f() {
    await Promise.reject(new Error("Whoops!"));
}
// 等价于
async function f() {
    throw new Error("Whoops!");
}
```
<br/>
`try..catch`:  
```js
async function f() {
    try {
        let response = await fetch(http://no-such-url');
        let user = await response.json();
    } catch (err) {
        // 同时抓取 fetch 和 response.json 中的异常
        alert(err);
    }
}
```
如果没有 `try..catch`，可以使用 `.catch`：  
```js
async function f() {
    let response = await fetch(http://no-such-url');
}
f().catch(alert);
```

## 1、 `async/await` 能很好地处理 `Promise.all`
```js
async function f() {
    // wait for the array results
    let results = await Promise.all([
        fetch(url1),
        fetch(url2),
        ,,,
    ]);
}
```

# Microtask Queue
```js
async function f() {
    return 1;
}

(async () => {
    setTimeout(() => alert('timeout'), 0);
    await f();
    alert('await');
})();
```
`await` 先执行。作为 `microtask`， `await` 比 `setTimeout`的优先级高。  
