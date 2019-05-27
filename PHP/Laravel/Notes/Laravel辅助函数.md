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
