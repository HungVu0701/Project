@section('styles')
    <link rel="stylesheet" href="{{ URL::asset('css/bootstrap-select.css')}}">
@stop

@section('scripts')
    <script src="{{ URL::asset('js/bootstrap-select.min.js') }}"></script>
    <script src="{{ URL::asset('js/notify.min.js') }}"></script>
@stop

@section('scripts-bottom')
    <script src="{{ URL::asset('js/jquery.validate.min.js') }}"></script>
    @include('javascript.change_pass')
@stop

@section('content')
    <div class="container">
        <div class="row">
            <div id="login_page_top" class="col-lg-4 col-lg-push-4 col-md-6 col-md-push-3 col-sm-8 col-sm-push-2">
                <div>
                    <h1 class="page-title">{{ trans('lang.change_password') }}</h1>
                </div>
            </div>
        </div>

        <div class="row">
            <div id="login_page_middle"
                 class="col-lg-4 col-lg-push-4 col-md-6 col-md-push-3 col-sm-8 col-sm-push-2 div_login_page_middle">
                <div class="content-box login-form">

                    {{ Form::open(['id' => 'form-change-password-first']) }}
                        <div class="form-group">
                            {{ Form::password('old_password', ['id' => 'old_password' , 'class'=>'form-control', 'placeholder'=>trans('lang.old_password_placeholder')])}}
                        </div>

                        <div class="form-group">
                            {{ Form::password('new_password', ['id' => 'new_password_a', 'class'=>'form-control', 'placeholder'=>trans('lang.new_password_placeholder')])}}
                        </div>

                        <div class="form-group">
                            {{ Form::password('confirm_new_password', ['id' => 'confirm_new_password', 'class'=>'form-control',  'placeholder'=>trans('lang.confirm_new_password')])}}
                        </div>

                        <div class="form-group">
                            <button type="submit"
                                    class="btn btn-primary btn-block btn-login">{{ trans('lang.save') }}</button>
                        </div>
                    {{ Form::close() }}
                </div>
            </div>
        </div>
    </div>
@stop
