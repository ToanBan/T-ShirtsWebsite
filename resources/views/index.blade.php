<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Document</title> 
    @vite(['resources/js/app.jsx'])
</head>
<body>
    @if(auth()->user() && auth()->user()->role == "Admin")
        <a href="/admin"></a>
    @endif
    <div class="root"></div>
</body>
</html>