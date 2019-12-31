
## getLocalIdent
自定义生成 classname 的方法。  
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            getLocalIdent: (context, localIdentName, localName, options) => {
              return 'whatever_random_class_name';
            },
          },
        },
      },
    ],
  },
};
```
