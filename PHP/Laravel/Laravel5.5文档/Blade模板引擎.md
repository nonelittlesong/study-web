# Blade简介
Blade 是由 Laravel 提供的非常简单但功能强大的模板引擎，  
不同于其他流行的 PHP 模板引擎，Blade 在视图中并不约束你使用 PHP 原生代码。  
所有的 Blade 视图最终都会被编译成原生 PHP 代码并缓存起来直到被修改，这意味着对应用的性能而言 Blade 基本上是零开销。  
Blade 视图文件使用 .blade.php 文件扩展并存放在 resources/views 目录下。  

# 一、 模板继承

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



# 二、 数据显示
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

**`@verbatim`指令**  
如果你在模板中有很大一部分篇幅显示 JavaScript 变量，那么可以将这部分 HTML 封装在 `@verbatim` 指令中，这样就不需要在每个 Blade 输出表达式前加上 `@` 前缀：  
```htm
@verbatim
    <div class="container">
        Hello, {{ name }}.
    </div>
@endverbatim
```




# 三、 流程控制
## 1、 if语句
可以使用 `@if` , `@elseif` , `@else` 和 `@endif` 来构造 if 语句，这些指令的功能和 PHP 相同：  
```
@if (count($records) === 1)
    I have one record!
@elseif (count($records) > 1)
    I have multiple records!
@else
    I don't have any records!
@endif
```
为方便起见，Blade 还提供了 `@unless` 指令，表示除非：  
```
@unless (Auth::check())
    You are not signed in.
@endunless
```

此外，Blade 还提供了 `@isset` 和 `@empty` 指令，分别对应 PHP 的 `isset` 和 `empty` 方法：  
```
@isset($records)
    // $records is defined and is not null...
@endisset

@empty($records)
    // $records is "empty"...
@endempty
```

**认证指令:**  
`@auth` 和 `@guest` 指令可用于快速判断当前用户是否登录：  
```
@auth
    // 用户已登录...
@endauth

@guest
    // 用户未登录...
@endguest
```

如果需要的话，你也可以在使用 `@auth` 和 `@guest` 的时候指定登录用户类型：  
```
@auth('admin')
    // The user is authenticated...
@endauth

@guest('admin')
    // The user is not authenticated...
@endguest
```

## 2、 switch语句
switch 语句可以通过 `@switch`，`@case`，`@break`，`@default` 和 `@endswitch` 指令构建：  
```
@switch($i)
    @case(1)
        First case...
        @break

    @case(2)
        Second case...
        @break

    @default
        Default case...
@endswitch
```

## 3、 循环
除了条件语句，Blade 还提供了简单的指令用于处理 PHP 的循环结构，同样，这些指令的功能和 PHP 对应功能完全一样：  
```
@for ($i = 0; $i < 10; $i++)
    The current value is {{ $i }}
@endfor

@foreach ($users as $user)
    <p>This is user {{ $user->id }}</p>
@endforeach

@forelse ($users as $user)
    <li>{{ $user->name }}</li>
@empty
    <p>No users</p>
@endforelse

@while (true)
    <p>I'm looping forever.</p>
@endwhile
```
>注：在循环的时候可以使用 `$loop` 变量获取循环信息，例如是否是循环的第一个或最后一个迭代。  

**结束循环或跳出当前迭代：**  
```
@foreach ($users as $user)
    @if ($user->type == 1)
        @continue
    @endif

    <li>{{ $user->name }}</li>

    @if ($user->number == 5)
        @break
    @endif
@endforeach
```
还可以使用指令声明来引入条件：  
```
@foreach ($users as $user)
    @continue($user->type == 1)
        <li>{{ $user->name }}</li>
    @break($user->number == 5)
@endforeach
```

**`$loop`变量**  
在循环的时候，可以在循环体中使用 `$loop` 变量，该变量提供了一些有用的信息，比如当前循环索引，以及当前循环是不是第一个或最后一个迭代:  
```
@foreach ($users as $user) 
    @if ($loop->first)
        This is the first iteration.
    @endif

    @if ($loop->last)
        This is the last iteration.
    @endif

    <p>This is user {{ $user->id }}</p>
@endforeach
```
如果你身处嵌套循环，可以通过 `$loop` 变量的 `parent` 属性访问父级循环：  
```
@foreach ($users as $user)
    @foreach ($user->posts as $post)
        @if ($loop->parent->first)
            This is first iteration of the parent loop.
        @endif
    @endforeach
@endforeach
```
`$loop`变量还提供了其他一些有用的属性：  

| 属性 | 描述 |
| -- | --- |
| $loop->index | 当前循环索引（从0开始） |
| $loop->iteration | 当前循环迭代（从1开始） |
| $loop->remaining | 当前剩余的迭代 |
| $loop->count | 迭代数组元素的总数量 |
| $loop->first | 是否是当前循环的第一个迭代 |
| $loop->last | 是否是当前循环的最后一个迭代 |
| $loop->depth | 当前循环的嵌套层级 |
| $loop->parent | 嵌套循环中的父级循环变量 |

## 4、 注释
Blade 注释并不会包含到 HTML 中被返回：  
```
{{-- This comment will not be present in the rendered HTML --}}
```

## 5、 嵌入PHP
```
@php
    //
@endphp
```
>注：尽管 Blade 提供了这个特性，如果过于频繁地使用它意味着你在视图模板中嵌入了过多的业务逻辑，需要注意。  




# 四、 包含子视图
Blade 的 `@include` 指令允许你很轻松地在一个视图中包含另一个 Blade 视图，所有父级视图中变量在被包含的子视图中依然有效：  
```htm
<div>
    @include('shared.errors')

    <form>
        <!-- Form Contents -->
    </form>
</div>
```
上述指令会在当前目录下的 `shared` 子目录中寻找 `errors.blade.php` 文件并将其内容引入当前视图。  

尽管被包含的视图可以继承所有父视图中的数据，你还可以**传递额外参数**到被包含的视图：  
```
@include('view.name', ['some' => 'data'])
```

当然，如果你尝试包含一个不存在的视图，Laravel 会抛出错误，如果你想要**包含一个有可能不存在的视图**，可以使用 `@includeIf` 指令:  
```
@includeIf('view.name', ['some' => 'data'])
```

如果**包含的视图取决于一个给定的布尔条件**，可以使用 `@includeWhen` 指令：  
```
@includeWhen($boolean, 'view.name', ['some' => 'data'])
```

要**包含给定数组中的第一个视图**，可以使用 `@includeFirst` 指令：  
```
@includeFirst(['custom.admin', 'admin'], ['some' => 'data'])
```
>注：不要在 Blade 视图中使用 `__DIR__` 和 `__FILE__` 常量，因为它们会指向缓存视图的路径。  

