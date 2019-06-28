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

