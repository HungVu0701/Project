@section('title', trans('lang.all_reports'))

@section('scripts-bottom')
    @include('javascript.admin_home')
@stop

@section('scripts')
    <script src="{{ URL::asset('js/notify.min.js') }}"></script>
@stop


@section('content')
    <div class="panel-group">
        <div class="panel panel-default">
            <div class="panel-heading">
                <a data-toggle="collapse" data-target="#form-view-tenant" href="#form-view-tenant"> {{trans('lang.tenant_info')}}</a>
            </div>
            <div id="form-view-tenant" class="panel-collapse collapse in">
                <div class="col-sm-8 col-md-8" style="padding-top: 10px; padding-bottom: 10px;">
                    <div class="row">
                        <div class="col-sm-5 col-md-5">
                            {{ Form::label('', trans('lang.total_tenant').':') }}
                        </div>
                        <div class="col-sm-7 col-md-7">
                            <span id="tenant_count"></span>
{{--                            {{ Form::label('', null, ['id' => 'tenant_count'])}}--}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-5 col-md-5">
                            {{ Form::label('', trans('lang.total_tenant_disable').':') }}
                        </div>
                        <div class="col-sm-7 col-md-7">
                            <span id="tenant_disable_count"></span>
{{--                            {{ Form::label('', null, ['id' => 'tenant_disable_count'])}}--}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-5 col-md-5">
                            {{ Form::label('', trans('lang.total_subadmin').':') }}
                        </div>
                        <div class="col-sm-7 col-md-7">
                            <span id="subadmin_count"></span>
{{--                            {{ Form::label('', null, ['id' => 'subadmin_count'])}}--}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-5 col-md-5">
                            {{ Form::label('', trans('lang.total_subadmin_disable').':') }}
                        </div>
                        <div class="col-sm-7 col-md-7">
                            <span id="subadmin_disable_count"></span>
{{--                            {{ Form::label('', null, ['id' => 'subadmin_disable_count'])}}--}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-5 col-md-5">
                            {{ Form::label('', trans('lang.total_user').':') }}
                        </div>
                        <div class="col-sm-7 col-md-7">
                            <span id="user_count"></span>
{{--                            {{ Form::label('', null, ['id' => 'user_count'])}}--}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-5 col-md-5">
                            {{ Form::label('', trans('lang.total_user_disable').':') }}
                        </div>
                        <div class="col-sm-7 col-md-7">
                            <span id="user_disable_count"></span>
{{--                            {{ Form::label('', null, ['id' => 'user_disable_count'])}}--}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-5 col-md-5">
                            {{ Form::label('', trans('lang.total_device').':') }}
                        </div>
                        <div class="col-sm-7 col-md-7">
                            <span id="device_count"></span>
{{--                            {{ Form::label('', null, ['id' => 'device_count'])}}--}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-5 col-md-5">
                            {{ Form::label('', trans('lang.total_project').':') }}
                        </div>
                        <div class="col-sm-7 col-md-7">
                            <span id="project_count"></span>
{{--                            {{ Form::label('', null, ['id' => 'project_count'])}}--}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-5 col-md-5">
                            {{ Form::label('', trans('lang.total_project_disable').':') }}
                        </div>
                        <div class="col-sm-7 col-md-7">
                            <span id="project_disable_count"></span>
{{--                            {{ Form::label('', null, ['id' => 'project_disable_count'])}}--}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-5 col-md-5">
                            {{ Form::label('', trans('lang.total_device_allocate').':') }}
                        </div>
                        <div class="col-sm-7 col-md-7">
                            <span id="max_device_allocate"></span>
{{--                            {{ Form::label('', null, ['id' => 'max_device_allocate'])}}--}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-5 col-md-5">
                            {{ Form::label('', trans('lang.total_user_allocate').':') }}
                        </div>
                        <div class="col-sm-7 col-md-7">
                            <span id="max_user_allocate"></span>
{{--                            {{ Form::label('', null, ['id' => 'max_user_allocate'])}}--}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-5 col-md-5">
                            {{ Form::label('', trans('lang.total_file_allocate').':') }}
                        </div>
                        <div class="col-sm-7 col-md-7">
                            <span id="max_file_allocate"></span>
{{--                            {{ Form::label('', null, ['id' => 'max_file_allocate'])}}--}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-5 col-md-5">
                            {{ Form::label('', trans('lang.total_project_allocate').':') }}
                        </div>
                        <div class="col-sm-7 col-md-7">
                            <span id="max_project_allocate"></span>
{{--                            {{ Form::label('', null, ['id' => 'max_project_allocate'])}}--}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-5 col-md-5">
                            {{ Form::label('', trans('lang.total_store_size_allocate').':') }}
                        </div>
                        <div class="col-sm-7 col-md-7">
                            <span id="max_store_size_allocate"></span>
{{--                            {{ Form::label('', null, ['id' => 'max_store_size_allocate'])}}--}}
                        </div>
                    </div>
                </div>
                <div style="padding-top: 10px; padding-bottom: 350px;"></div>
            </div>
        </div>
    </div>
@stop