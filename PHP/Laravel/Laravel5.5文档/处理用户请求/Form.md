
一、 快速入门
## 1、 定义路由
`routes/web.php`：  
```php
// 显示创建博客文章表单...
Route::get('post/create', 'PostController@create');
// 存储新的博客文章...
Route::post('post', 'PostController@store');
```

## 2、 创建控制器
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostController extends Controller
{
    /**
     * 显示创建新的博客文章的表单
     *
     * @return Response
     */
    public function create()
    {
        return view('post.create');
    }

    /**
     * 存储新的博客文章
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        // 验证并存储博客文章...
    }
}
```

## 3、 编写验证逻辑
现在我们准备用验证新博客文章输入的逻辑填充 store 方法。我们使用 `Illuminate\Http\Request` 对象提供的 `validate` 方法来实现这一功能，如果验证规则通过，代码将会继续往下执行；反之，如果验证失败，将会抛出一个异常，相应的错误响应也会自动发送给用户。在这个传统的 HTTP 请求案例中，将会生成一个重定向响应，如果是 AJAX 请求则会返回一个 JSON 响应。  

要更好地理解 `validate` 方法，让我们回顾下 `store` 方法：  
```php
/**
 * 存储博客文章
 *
 * @param  Request  $request
 * @return Response
 */
public function store(Request $request){
    $validatedData = $request->validate([
        'title' => 'required|unique:posts|max:255',
        'body' => 'required',
    ]);

    // 验证通过，存储到数据库...
}
```

正如你所看到的，我们只是传入期望的验证规则到 `validate` 方法。再强调一次，如果验证失败，相应的响应会自动生成。如果验证通过，控制器将会继续往下执行。  

>注：实际执行代码之前，需要在数据库中创建 `posts` 数据表，因为这里用到了 `unique:posts` 这个验证规则，该规则会去数据库中查询传入标题是否已存在以保证唯一性。  

