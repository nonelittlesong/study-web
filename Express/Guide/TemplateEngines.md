`app.js` 配置：  
* views - app.set('views', './views')
* view engine - app.set('view engine', 'pug')

`index.pug`:  
```htm
html
  head
    title= title
  body
    h1= message
```

```js
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```
