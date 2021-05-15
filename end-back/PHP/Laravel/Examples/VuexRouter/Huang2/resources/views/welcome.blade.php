<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="csrf-token" content="{{ csrf_token() }}">

        <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css"/>

        <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">

        <title>Huang2</title>


    </head>

    <body>

    <div id="app">
        <detect-component></detect-component>
    </div>

    <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>


    </body>
</html>
