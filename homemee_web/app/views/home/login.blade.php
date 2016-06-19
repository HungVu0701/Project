@extends('layouts.master')
@section('title', trans('lang.sign_in'))

@section('body')
    <body class="hold-transition login-page">
        <script src="{{ URL::asset('js/jquery.backstretch.js') }}"></script>

        <div class="login-box">
            <div class="login-logo">
                <a href="/"><b>Home</b>Mee</a>
            </div>
            <!-- /.login-logo -->
            <div class="login-box-body">
                <p class="login-box-msg">{{trans('lang.sign_in_to_start_your_session')}}</p>
                @if(Session::get('login_errors'))
                    <div class="alert alert-danger alert-dismissable" style="padding-top: 10px; padding-bottom: 20px;">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h5>{{ Session::get('msg') }}</h5>
                    </div>
                @endif

                {{--<form method="post" action="../../index2.html">--}}
                {{ Form::open(['route' => 'auth.login', 'id' => 'form-login']) }}
                    <div class="form-group has-feedback">
                        {{--<input type="text" placeholder="Phone Number" class="form-control">--}}
                        {{ Form::text('email', null, ['id' => 'email', 'class'=>'form-control floating-label', 'placeholder' => trans('lang.email_placeholder')])}}
                        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                    </div>
                    <div class="form-group has-feedback">
                        {{--<input type="password" placeholder="Password" class="form-control">--}}
                        {{ Form::password('password', ['id' => 'password', 'class'=>'form-control', 'placeholder'=>trans('lang.password_placeholder')])}}
                        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                    </div>
                    @if(Session::get('captcha'))
                        <div class="form-group has-feedback">
                            {{HTML::image(Captcha::img(), 'Captcha image')}}
                            {{ Form::text('captcha', null, ['id' => 'captcha', 'class'=>'form-control', 'placeholder' => trans('lang.captcha...')])}}
                        </div>
                    @endif
                    @if(true)
                        {{ Form::text('vision_one_token', Session::get('vision_one_token'), ['id' => 'vision_one_token', 'class'=>'hidden'])}}
                    @endif

                    <div class="row">
                        <div class="col-xs-8">
                            <div class="checkbox icheck">
                                <label class="">
                                    <div class="icheckbox_square-blue" style="position: relative;" aria-checked="false" aria-disabled="false">
                                        <input type="checkbox" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; border: 0px none; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; border: 0px none; opacity: 0;"></ins>
                                    </div> Remember Me
                                </label>
                            </div>
                        </div>
                        <!-- /.col -->
                        <div class="col-xs-4">
                            <button class="btn btn-primary btn-block btn-flat" type="submit">{{ trans('lang.sign_in') }}</button>
                        </div>
                        <!-- /.col -->
                    </div>
                {{--</form>--}}
                {{ Form::close() }}

                <a href="#">I forgot my password</a><br>
                <a class="text-center" href="/register">Register a new membership</a>

            </div>
            <!-- /.login-box-body -->
        </div>
        <!-- /.login-box -->

        {{--<!-- jQuery 2.2.0 -->--}}
        {{--<script src="{{ URL::asset('css/adminlte/jQuery-2.js') }}"></script>--}}
        {{--<!-- Bootstrap 3.3.6 -->--}}
        {{--<script src="{{ URL::asset('css/adminlte/bootstrap.js') }}"></script>--}}
        <!-- iCheck -->
        <script src="{{ URL::asset('css/adminlte/icheck.js') }}"></script>
        <script>
            $(function () {
                $('input').iCheck({
                    checkboxClass: 'icheckbox_square-blue',
                    radioClass: 'iradio_square-blue',
                    increaseArea: '20%' // optional
                });
            });

            $.backstretch([
                "/img/icon/1.jpg",
                "/img/icon/2.jpg",
                "/img/icon/3.jpg",
                "/img/icon/4.jpg"
            ], {
                fade: 1000,
                duration: 8000
            });

            $("#form-login").submit(function () {
                var isFormValid = true;

                $("#password").each(function () {
                    if ($.trim($(this).val()).length == 0) {
                        $(this).addClass("highlight");
                        $(this).focus();
                        $.notify('{{trans('lang.error_password_empty')}}', "error");
                        isFormValid = false;
                    }
                    else {
                        $(this).removeClass("highlight");
                    }
                });

                $("#email").each(function () {
                    if ($.trim($(this).val()).length == 0) {
                        $(this).addClass("highlight");
                        $(this).focus();
                        $.notify('{{trans('lang.email_empty')}}', "error");
                        isFormValid = false;
                    }
                    else {
                        $(this).removeClass("highlight");
                    }
                });
                return isFormValid;
            });
        </script>
    </body>
@stop