<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>RedisSocket</title>

    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>

<body>
<div class="container">
    News Room
</div>
<script src="{{ mix('js/app.js') }}"></script>
<script>
    Echo.channel('laravel_database_news')
        .listen('News', (e) => {
            console.log(e.message);
        });
</script>
</body>
</html>