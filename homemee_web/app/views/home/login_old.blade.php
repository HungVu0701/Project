@section('title', trans('lang.sign_in'))

@section('scripts')
    <script src="{{ URL::asset('js/jquery.backstretch.js') }}"></script>
@stop

@section('scripts-bottom')
    <script src="{{ URL::asset('js/notify.min.js') }}"></script>
    <script>
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

        $.backstretch([
           "/img/icon/1.jpg",
           "/img/icon/2.jpg",
           "/img/icon/3.jpg",
           "/img/icon/4.jpg"
            ], {
              fade: 1000,
              duration: 8000
        });
    </script>
@stop
@section('content')
    {{--<div class="row">--}}
        {{--<div id="login_page_top" class="col-lg-4 col-lg-push-4 col-md-6 col-md-push-3 col-sm-8 col-sm-push-2" style="margin-top: 100px;">--}}
            {{--<div>--}}
                {{--<h1 class="page-title" style="color: #555">{{ trans('lang.sign_in') }}</h1>--}}
            {{--</div>--}}
        {{--</div>--}}
    {{--</div>--}}

    <div class="row">
        <div id="login_page_middle"
             class="col-lg-4 col-lg-push-4 col-md-4 col-md-push-3 col-sm-4 col-sm-push-2 div_login_page_middle" style="margin-top: 100px;">
             <h1 class="page-title" style="color: #555; margin-top: 0px;">{{ trans('lang.sign_in') }}</h1>
            <div class="content-box login-form">
                @if(Session::get('login_errors'))
                    <div class="alert alert-danger alert-dismissable" style="padding-top: 10px; padding-bottom: 20px;">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h5>{{ Session::get('msg') }}</h5>
                    </div>
                @endif

                @if(Session::has('password_reset'))
                    <div class="alert alert-success alert-dismissable" style="padding-top: 10px; padding-bottom: 20px;">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h5>{{ trans('lang.password_has_been_reset') }}</h5>
                    </div>
                @endif

                {{ Form::open(['route' => 'auth.login', 'id' => 'form-login']) }}
                <div class="form-group">
                    {{--{{ Form::label('username', 'Username', [ 'class' => 'control-label' ]) }}--}}
                    {{ Form::text('email', null, ['id' => 'email', 'class'=>'form-control floating-label', 'placeholder' => trans('lang.email_placeholder')])}}
                </div>
                <div class="form-group">
                    {{--{{ Form::label('password', 'Password', [ 'class' => 'control-label' ]) }}--}}
                    {{ Form::password('password', ['id' => 'password', 'class'=>'form-control', 'placeholder'=>trans('lang.password_placeholder')])}}
                </div>
                @if(Session::get('captcha'))
                    <div class="form-group">
                        {{HTML::image(Captcha::img(), 'Captcha image')}}
                        {{ Form::text('captcha', null, ['id' => 'captcha', 'class'=>'form-control', 'placeholder' => trans('lang.captcha...')])}}
                    </div>
                @endif
                @if(true)
                    {{ Form::text('vision_one_token', Session::get('vision_one_token'), ['id' => 'vision_one_token', 'class'=>'hidden'])}}
                @endif
                <div class="form-group">
                    <button type="submit"
                            class="btn btn-primary btn-block btn-login">{{ trans('lang.sign_in') }}</button>
                </div>
                {{ Form::close() }}
            </div>
        </div>
    </div>
@stop
