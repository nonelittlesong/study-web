数据库填充器。  

# 相关artisan指令
根据Eloquent模型生成表：  
```
php artisan migrate
```

生成对应的数据填充器：  
```
php artisan make:seeder UsersTableSeeder
```

填充数据：  
```
php artisan db::seed
```

