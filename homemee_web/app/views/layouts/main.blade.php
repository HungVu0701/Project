@extends('layouts.master')

@section('body')
    <body class="skin-blue fixed sidebar-mini">
    @include('javascript.visionone')
    @yield('scripts')

    @include('partials.header')
    @include('partials.asideMain')
    <div class="content-wrapper" style="min-height: 157px;">
    <div class="row">
    <div class="col-xs-12">
    @yield('content')
    </div>
    </div>
    </div>
    @include('partials.footer')
{{--    @include('partials.asideController')--}}
    <div class="control-sidebar-bg" style="position: fixed; height: auto;"></div>

    @yield('modal')
    @yield('scripts-bottom')
    @include('javascript.visionone_bottom')
    </body>
@stop
