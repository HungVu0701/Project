@section('title', trans('lang.profile'))

    {{--@section('sidebar')--}}
    {{--@include('partials.sidebar')--}}
    {{--@stop--}}

@section('styles')
    <link rel="stylesheet" href="{{ URL::asset('css/bootstrap-select.css')}}">
    <link rel="stylesheet" href="{{ URL::asset('css/bootstrap-table.css')}}">
@stop

@section('scripts')
    <script src="{{ URL::asset('js/bootstrap-select.min.js') }}"></script>
    <script src="{{ URL::asset('js/bootstrap-table.js') }}"></script>
    <script src="{{ URL::asset('js/notify.min.js') }}"></script>
@stop

@section('scripts-bottom')
    <script src="{{ URL::asset('js/jquery.validate.min.js') }}"></script>
    @include('javascript.profile')
@stop

@section('content')
    <div id="content">
        <ul id="tabs" class="nav nav-tabs" data-tabs="tabs">
            <li class="active"><a href="#profile" data-toggle="tab">{{trans('lang.profile')}}</a></li>
            <li><a href="#change_password" data-toggle="tab">{{trans('lang.change_password')}}</a></li>
        </ul>
        <div id="my-tab-content" class="tab-content">
            <div class="tab-pane active" id="profile">
                <div class="form-group">
                    {{ Form::label('email', trans('lang.email').'  *', [ 'class' => 'control-label' ]) }}
                    {{ Form::text('email', null, ['class'=>'form-control', 'id' => 'email', 'maxlength' => 100])}}
                </div>
                <div class="form-group">
                    {{ Form::label('first_name', trans('lang.first_name').'  *', [ 'class' => 'control-label' ]) }}
                    {{ Form::text('first_name', null, ['class'=>'form-control', 'id' => 'first_name', 'maxlength' => 100])}}
                </div>

                <div class="form-group">
                    {{ Form::label('last_name', trans('lang.last_name').'  *', [ 'class' => 'control-label' ]) }}
                    {{ Form::text('last_name', null, ['class'=>'form-control', 'id' => 'last_name', 'maxlength' => 100])}}
                </div>
            </div>

            <div class="tab-pane" id="change_password">
                {{ Form::open(['id' => 'form-change-password'])}}
                <div class="form-group">
                    {{ Form::label('old_password', trans('lang.old_password').'  *', [ 'class' => 'control-label' ]) }}
                    {{ Form::password('old_password', null, ['class'=>'form-control', 'id' => 'old_password', 'maxlength' => 100])}}
                </div>
                <div class="form-group">
                    {{ Form::label('new_password', trans('lang.new_password').'  *', [ 'class' => 'control-label' ]) }}
                    {{ Form::password('new_password', null, ['class'=>'form-control', 'id' => 'new_password', 'maxlength' => 100])}}
                </div>
                <div class="form-group">
                    {{ Form::label('confirm_new_password', trans('lang.confirm_new_password').'  *', [ 'class' => 'control-label' ]) }}
                    {{ Form::password('confirm_new_password', null, ['class'=>'form-control', 'id' => 'confirm_new_password', 'maxlength' => 100])}}
                </div>
                <input class="hidden" type="text" name="method" id="method" value="EDIT"/>
                <input class="hidden" type="text" name="userId" id="userId" value=""/>

                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary"
                            id="save-bt-update">{{trans('lang.save')}}
                    </button>
                </div>
                {{Form::token() . Form::close()}}
            </div>
        </div>
    </div>
@stop
