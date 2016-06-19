<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:og="http://ogp.me/ns#"
>
<head>
    @section('description', trans('langs.meta_description'))
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:title" content=""/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content=""/>
    <meta property="og:image" content=""/>
    <meta property="og:site_name" content=""/>
    <meta property="og:description" content="@yield('description')"/>
    <meta name="description" content="@yield('description')">
    <meta name="author" content="{{ trans('langs.meta_author') }}">
    <title>
        @yield('title')
    </title>

    <link rel="stylesheet" href={{ URL::asset('css/adminlte/bootstrap.css')}}>
    <link rel="stylesheet" href={{ URL::asset('css/adminlte/font-awesome.css')}}>
    <link rel="stylesheet" href={{ URL::asset('css/adminlte/ionicons.css')}}>
    <link rel="stylesheet" href={{ URL::asset('css/adminlte/dataTables.css')}}>
    <link rel="stylesheet" href={{ URL::asset('css/adminlte/datepicker3.css')}}>
    <link rel="stylesheet" href={{ URL::asset('css/adminlte/AdminLTE.css')}}>
    <link rel="stylesheet" href={{ URL::asset('css/adminlte/_all-skins.css')}}>

    <script type="text/javascript" src="{{ URL::asset('css/adminlte/ca-pub-4495360934352473.js')}}"></script>
    @include('javascript.adminlte')
    <script src="{{ URL::asset('css/adminlte/jQuery-2.js') }}"></script>
    <script src="{{ URL::asset('css/adminlte/bootstrap.js') }}"></script>
    <script src="{{ URL::asset('css/adminlte/jquery_002.js') }}"></script>
    <script src="{{ URL::asset('css/adminlte/bootstrap-datepicker.js') }}"></script>
    <script src="{{ URL::asset('css/adminlte/dataTables.js') }}"></script>
    <script src="{{ URL::asset('css/adminlte/jquery.js') }}"></script>
    <script src="{{ URL::asset('css/adminlte/fastclick.js') }}"></script>
    <script src="{{ URL::asset('css/adminlte/app.js') }}"></script>
    <script src="{{ URL::asset('css/adminlte/demo.js') }}"></script>

    @yield('styles')
    <script src="{{ URL::asset('js/jquery.validate.min.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('js/notify.min.js') }}"></script>
    <script>
        var time_out = 500;
        var timer = null;
    </script>
</head>
@yield('body')
</html>
