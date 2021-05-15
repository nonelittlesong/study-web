https://learnku.com/docs/laravel/5.5/helpers/1320  

# abort()
`abort` 函数抛出异常处理程序呈现的 HTTP 异常：  
```php
abort(401);
```
你也可以提供额外的响应文本和自定义响应标头：  
```php
abort(403, 'Unauthorized.', $headers);
```

# asset()
使用内置的URL类上的asset()方法来引入css和js文件。  
引入站内css和js：  
```htm
<link rel="stylesheet" href="{{ URL::asset('css/bootstrap.css') }}">
<script type="text/javascript" src="{{ URL::asset('js/jquery.min.js') }}"></script>
```
>注：默认相对于web根目录，也就是public目录。  

引入站外css和js：  
```htm
<link rel="stylesheet" href="{{ URL::asset('//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css') }}">

<script type="text/javascript" src="{{ URL::asset('//code.angularjs.org/1.2.13/angular.js') }}"></script>
```

### \# 可用asset()代替URL::asset()
helper.php:  
```php
if (! function_exists('asset')) {
    /**
     * Generate an asset path for the application.
     *
     * @param  string  $path
     * @param  bool    $secure
     * @return string
     */
    function asset($path, $secure = null)
    {
        return app('url')->asset($path, $secure);
    }
}
```

### \# asset() vs mix()
laravel 自带了 laravel-mix，用于对js， css， 图片等静态资源打包，生成的文件会是: js文件原名 + hash + .js后缀。  
所以，使用 `mix('app.js')` 去匹配对应的 `app+hash+.js`（项目public目录下会有一个mix-manifest.json, 这里面保存了两者的对应关系，每次打包静态资源的时候都会更新该文件）。  

而有些时候我们并不希望静态资源的名称中被加上hash值（大部分情况是独自引入的非nodejs模块的第三方库），这个时候就可以直接使用asset方法，它就是直接简单粗暴地找你给它名称的文件。  
