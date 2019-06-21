* https://learnku.com/docs/laravel/5.5/filesystem/1319  
* https://laravelacademy.org/post/19509.html

# 一、 配置
```php
'disk' => [
    'local' -> [
        'driver' => 'local',
        'root'   => storage_path('app'),
    ],
    
    'public' => [
        'driver'     => 'local',
        'root'       => storage_path('app/public'),
        'url'        => env('APP_URL') . '/storage',
        'visibility' => 'public',
    ],
    
    's3' => [
        'driver' => 's3',
        'key' => env('AWS_KEY'),
        'secret' => env('AWS_SECRET'),
        'region' => env('AWS_REGION'),
        'bucket' => env('AWS_BUCKET'),
    ],
],
```

## 1、 公共磁盘
`public` 磁盘用于存储可以被公开访问的文件，默认情况下， `public` 磁盘使用 `local` 驱动并将文件存储在 `storage/app/public` 目录下，要让这些文件可以通过 Web 浏览器访问到，还需要创建一个软链 `public/storage` 指向 `storage/app/public` ，这种方式可以将公开访问的文件保存在一个可以很容易被不同部署环境共享的目录。  

要创建这个软链，可以使用 Artisan 命令 `storage:link` ：  
```
php artisan storage:link
```
文件被存储并且软链已经被创建的情况下，就可以使用辅助函数 `asset` 创建一个指向该文件的 URL：  
```php
echo asset('storage/file.txt');
```

## 2、 本地驱动
使用 `local` 驱动的时候，所有的文件操作都相对于定义在配置文件中的 `root` 目录，默认情况下，该值设置为 `storage/app` 目录，因此，下面的方法将会存储文件到 `storage/app/file.txt`：
```php
Storage::disk('local')->put('file.txt', 'Contents');
```

## 3、 驱动预备知识
### \# Composer包
在使用 SFTP、Amazon S3 或 Rackspace 驱动之前，需要通过 Composer 安装相应的包：  

* SFTP：league/flysystem-sftp ~1.0
* Amazon S3: league/flysystem-aws-s3-v3 ~1.0
* Rackspace: league/flysystem-rackspace ~1.0

如果要考虑性能就必须要使用一个额外的缓存适配器：  

* CachedAdapter: league/flysystem-cached-adapter ~1.0

### \# S3 驱动配置
S3 驱动配置信息位于配置文件 `config/filesystems.php` ，该文件包含 S3 驱动的示例配置数组。你可以使用自己的 S3 配置和认证信息编辑该数组。为了方便起见，这些环境变量和 AWS CLI 的命名规范一致。  

### \# FTP 驱动配置
Laravel 的 Flysystem 集成支持 FTP 操作，不过，框架默认的配置文件 `filesystems.php` 并没有提供示例配置。如果你需要配置一个FTP文件系统，可以使用以下示例配置：  
```php
'ftp' => [
    'driver'   => 'ftp',
    'host'     => 'ftp.example.com',
    'username' => 'your-username',
    'password' => 'your-password',

    // Optional FTP Settings...
    // 'port'     => 21,
    // 'root'     => '',
    // 'passive'  => true,
    // 'ssl'      => true,
    // 'timeout'  => 30,
],
```

### \# SFTP 驱动配置
Laravel 的 Flysystem 集成支持 SFTP 操作，不过，框架默认的 `filesystems.php` 配置文件并没有为此提供一个示例配置。如果你需要配置针对 SFTP 的文件系统配置，可以使用下面的示例配置：  
```php
'sftp' => [
    'driver' => 'sftp',
    'host' => 'example.com',
    'username' => 'your-username',
    'password' => 'your-password',

    // Settings for SSH key based authentication...
    // 'privateKey' => '/path/to/privateKey',
    // 'password' => 'encryption-password',

    // Optional SFTP Settings...
    // 'port' => 22,
    // 'root' => '',
    // 'timeout' => 30,
],
```

### \# Rackspace
Laravel 的 Flysystem 集成还支持 Rackspace 操作，同样，默认配置文件 `filesystems.php` 也没有提供对应的示例配置，如果你需要配置 Rackspace 文件系统，可以使用以下示例配置：  
```php
'rackspace' => [
    'driver'    => 'rackspace',
    'username'  => 'your-username',
    'key'       => 'your-key',
    'container' => 'your-container',
    'endpoint'  => 'https://identity.api.rackspacecloud.com/v2.0/',
    'region'    => 'IAD',
    'url_type'  => 'publicURL',
], 
```


## 4、 缓存
要为给定磁盘启用缓存，需要添加 `cache` 指令到磁盘的配置选项，`cache` 配置项应该是一个包含 `disk` 名称、`expire` 时间（以秒为单位）以及缓存前缀 `prefix` 的数组：  
```php
's3' => [
    'driver' => 's3',

    // Other Disk Options...

    'cache' => [
        'store' => 'memcached',
        'expire' => 600,
        'prefix' => 'cache-prefix',
    ],
],
```


# 二、 获取磁盘实例
我们可以使用 `Storage` 门面和上面配置的任意磁盘进行交互，例如，可以使用该门面上的 `put` 方法来存储头像到默认磁盘，如果调用 `Storage` 门面上的方法而没有调用 `disk` 方法，则调用的方法会自动被传递到默认磁盘：  
```php
use Illuminate\Support\Facades\Storage;
Storage::put('avatars/1', $fileContents);
```
与多个磁盘进行交互时，可以使用 `Storage` 门面上的 `disk` 方法访问特定磁盘：  
```php
Storage::disk('s3')->put('avatars/1', $fileContents);
```


# 三、 获取文件
`get` 方法用于获取给定文件的内容，该方法将会返回该文件的原生字符串内容。需要注意的是，所有文件路径都是相对于配置文件中指定的磁盘默认根目录：  
```php
$contents = Storage::get('file.jpg');
```
`exists` 方法用于判断给定文件是否存在于磁盘上：  
```php
$exists = Storage::disk('s3')->exists('file.jpg');
```

## 1、 下载文件
`download` 方法可用于生成强制用户浏览器下载给定路径文件的响应。`download` 方法接收一个文件名作为第二个参数用于决定用户下载时看到的文件名。最后，你可以传递一个 HTTP 请求头数组作为该方法的第三个参数：  
```php
return Storage::download('file.jpg');

return Storage::download('file.jpg', $name, $headers);
```

## 2、 文件URL
使用 `local` 或 `s3` 驱动时，可以使用 `url` 方法获取给定文件的 URI。如果你使用的是 `local` 驱动，通常会在给定路径前加上 `/storage`，并返回该文件的相对 URL；如果使用的是 `s3` 或 `rackspace` 驱动，则会返回完整的远程 URL：  
```php
use Illuminate\Support\Facades\Storage;
$url = Storage::url('file1.jpg');
```
>注：记住，如果你在使用 `local` 驱动，所有需要公开访问的文件都应该存放在 `storage/app/public` 目录下，此外，你还需要创建一个指向 `storage/app/public` 目录的软链接 `public/storage`。  

### \# 临时URL
对于使用 `s3` 或 `rackspace` 驱动存储文件的系统，可以使用 `temporaryUrl` 方法创建临时 URL 到给定文件，该方法接收一个路径参数和指定 URL 何时过期的 `DateTime` 实例：   
```php
$url = Storage::temporaryUrl(
    'file1.jpg', now()->addMinutes(5)
);
```

### \# 自定义本地主机URL
如果你想要预定义使用 `local` 驱动磁盘存放文件的主机，可以添加 `url` 选项到磁盘配置数组：  
```
'public' => [
    'driver' => 'local',
    'root' => storage_path('app/public'),
    'url' => env('APP_URL').'/storage',
    'visibility' => 'public',
],
```

## 3、 文件元信息
除了读写文件之外，Laravel 还可以提供文件本身的信息。例如，`size` 方法可用于以字节方式返回文件大小：  
```php
use Illuminate\Support\Facades\Storage;

$size = Storage::size('file1.jpg');
```
`lastModified` 方法以 UNIX 时间戳格式返回文件最后一次修改时间：  
```php
$time = Storage::lastModified('file1.jpg');
```


# 三、 存储文件
* `put` 方法可用于存储原生文件内容到磁盘。
* 此外，还可以传递一个 PHP 资源到 `put` 方法。

```php
use Illuminate\Support\Facades\Storage;

Storage::put('file.jpg', $contents);
Storage::put('file.jpg', $resource);
```

### \# 自动文件流
如果你想要 Laravel 自动将给定文件流输出到对应存储路径，可以使用 `putFile` 或 `putFileAs` 方法，该方法接收 `Illuminate\Http\File` 或 `Illuminate\Http\UploadedFile` 实例，然后自动将文件流保存到期望的路径：  
```php
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

// 自动计算文件名的MD5值...
Storage::putFile('photos', new File('/path/to/photo'));

// 手动指定文件名...
Storage::putFileAs('photos', new File('/path/to/photo'), 'photo.jpg');
```
这里有一些关于 `putFile` 方法的重要注意点，注意到我们只指定了目录名，默认情况下，`putFile` 方法会基于文件内容自动生成文件名。实现原理是对文件内容进行 MD5 哈希运算。  
**`putFile` 方法会返回文件路径，包括文件名，以便于在数据库中进行存储。**  

`putFile` 和 `putFileAs` 方法还接收一个用于指定存储文件“可见度”的参数，这在你将文件存储到云存储（如S3）平台并期望文件可以被公开访问时很有用：  
```php
Storage::putFile('photos', new File('/path/to/photo'), 'public');
```

### \# 添加内容到文件开头/结尾
`prepend` 和 `append` 方法允许你轻松插入内容到文件开头/结尾：  
```php
Storage::prepend('file.log', 'Prepended Text');
Storage::append('file.log', 'Appended Text');
```

### \# 拷贝 & 移动文件
`copy` 方法将磁盘中已存在的文件从一个地方拷贝到另一个地方，而 `move` 方法将磁盘中已存在的文件从一定地方移到到另一个地方：  
```php
Storage::copy('old/file1.jpg', 'new/file1.jpg');
Storage::move('old/file1.jpg', 'new/file1.jpg');
```

## 1、 文件上传
