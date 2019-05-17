# Blade简介
Blade 是由 Laravel 提供的非常简单但功能强大的模板引擎，  
不同于其他流行的 PHP 模板引擎，Blade 在视图中并不约束你使用 PHP 原生代码。  
所有的 Blade 视图最终都会被编译成原生 PHP 代码并缓存起来直到被修改，这意味着对应用的性能而言 Blade 基本上是零开销。  
Blade 视图文件使用 .blade.php 文件扩展并存放在 resources/views 目录下。  

# 模板继承

## 1、 定义布局
由于大多数 Web 应用在不同页面中使用同一个布局，可以很方便的将这个布局定义为一个单独的 Blade 页面：   
```htm
<!-- 存放在 resources/views/layouts/app.blade.php -->

<html>
    <head>
        <title>应用名称 - @yield('title')</title>
    </head>
    <body>
        @section('sidebar')
            这里是侧边栏
        @show

        <div class="container">
            @yield('content')
        </div>
    </body>
</html>
```

## 2、 继承布局
定义子页面的时候，可以使用 Blade 的 `@extends` 指令来指定子页面所继承的布局，  
继承一个 Blade 布局的视图可以使用 `@section` 指令注入内容到布局定义的内容片段中，  
记住，如上面例子所示，这些片段的内容将会显示在布局中使用 `@yield` 的地方：  
```htm
<!-- 存放在 resources/views/child.blade.php -->

@extends('layouts.app')

@section('title', 'Laravel学院')

@section('sidebar')
    @parent
    <p>Laravel学院致力于提供优质Laravel中文学习资源</p>
@endsection

@section('content')
    <p>这里是主体内容，完善中...</p>
@endsection
```

在本例中，`sidebar` 片段使用 `@parent` 指令来追加（而非覆盖）内容到继承布局的侧边栏，`@parent` 指令在视图渲染时将会被布局中的内容替换。  
当然，和原生 PHP 视图一样，Blade 视图可以通过 `view` 方法直接从路由中返回：  
```php
Route::get('blade', function () {
   return view('child');
});
```

## 组件&插槽
我们假设有一个可复用的“alert”组件，我们想要在整个应用中都可以复用它：   
```htm
<!-- /resources/views/alert.blade.php -->

<div class="alert alert-danger">
    {{ $slot }}
</div>
```
`{{ $slot }}` 变量包含了我们想要注入组件的内容，现在，要构建这个组件，我们可以使用 Blade 指令 `@component`：  
```htm
@component('alert')
    <strong>Whoops!</strong> Something went wrong!
@endcomponent
```

有时候为组件定义多个插槽很有用。  
```htm
<!-- /resources/views/alert.blade.php -->

<div class="alert alert-danger">
    <div class="alert-title">{{ $title }}</div>
    {{ $slot }}
</div>
```
现在，我们可以使用指令 `@slot` 注入内容到命名的插槽。任何不在 `@slot` 指令中的内容都会被传递到组件的 `$slot` 变量中：  
```htm
@component('alert')
    @slot('title')
        Forbidden
    @endslot

    You are not allowed to access this resource!
@endcomponent
```

**传递额外数据到组件**  
有时候你可能需要传递额外数据到组件，出于这个原因，你可以传递数组数据作为第二个参数到 `@component` 指令，所有数据都会在组件模板中以变量方式生效：  
```htm
@component('alert', ['foo' => 'bar'])
    ...
@endcomponent
```



# 数据显示
可以通过两个花括号包裹变量来显示**传递到视图**的数据，比如，如果给出如下路由：  
```php
Route::get('greeting', function () {
    return view('welcome', ['name' => '学院君']);
});
```
那么可以通过如下方式显示 `name` 变量的内容：  
```htm
你好, {{ $name }}。
```
当然，不限制显示到视图中的变量内容，你还可以输出任何 PHP 函数的结果，实际上，可以将任何 PHP 代码放到 Blade 模板语句中：  
```htm
The current UNIX timestamp is {{ time() }}.
```
>注：Blade 的 `{{}}` 语句已经经过 PHP 的 `htmlentities` 函数处理以避免 XSS 攻击。  

**输出存在的数据**  
有时候你想要输出一个变量，但是不确定该变量是否被设置，我们可以通过如下 PHP 代码：  
```htm
{{ isset($name) ? $name : 'Default' }}
```
除了使用三元运算符，Blade 还提供了更简单的方式：  
```htm
{{ $name or 'Default' }}
```

**显示原生数据**  
默认情况下，Blade 的 `{{ }}` 语句已经通过 PHP 的 `htmlentities` 函数处理以避免 XSS 攻击，  
如果你不想要数据被处理，比如要输出带 HTML 元素的富文本，可以使用如下语法：  
```htm
Hello, {!! $name !!}.
```
>注：输出用户提供的内容时要当心，对用户提供的内容总是要使用双花括号包裹以避免直接输出 HTML 代码。  

**渲染JSON内容**  
有时候你可能会将数据以数组方式传递到视图再将其转化为 JSON 格式以便初始化某个 JavaScript 变量，例如：  
```
<script>
    var app = <?php echo json_encode($array); ?>;
</script>
```
这样显得很麻烦，有更简便的方式来实现这个功能，那就是 Blade 的 @json 指令：  
```
<script>
    var app = @json($array);
</script>
```

## 1、 Blade & JavaScript 框架
由于很多 JavaScript 框架也是用花括号来表示要显示在浏览器中的表达式，如 Vue，  
我们可以使用 `@` 符号来告诉 Blade 渲染引擎该表达式应该保持原生格式不作改动。比如：  
```htm
<h1>Laravel</h1>
Hello, @{{ name }}.
```
在本例中，`@` 符在编译阶段会被 Blade 移除，但是，`{{ name }}` 表达式将会保持不变，从而可以被 JavaScript 框架正常渲染。  
