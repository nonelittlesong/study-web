

## Troubleshot

### Enable inline javascript in less

```
{
  test: /\.less$/,
  use: [{
    loader: "style-loader"
  }, {
    loader: "css-loader"
  }, {
    loader: "less-loader",
    options: {
      javascriptEnabled: true
    }
  }]
}
```
