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


