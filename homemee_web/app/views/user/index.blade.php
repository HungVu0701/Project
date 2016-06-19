@section('title', trans('lang.all_users'))

@section('styles')
    <link rel="stylesheet" href="{{ URL::asset('css/bootstrap-table.css')}}">
    <link rel="stylesheet" href="{{ URL::asset('css/bootstrap-select.css')}}">
@stop

@section('scripts')
    <script src="{{ URL::asset('js/bootstrap-table.js') }}"></script>
    <script src="{{ URL::asset('js/notify.min.js') }}"></script>
    <script src="{{ URL::asset('js/bootstrap-select.min.js') }}"></script>
@stop

@section('scripts-bottom')
    <script type="application/javascript">
        var user_type = "{{\Session::get('user_type')}}"
    </script>
    @include('javascript.user')
    <script src="{{ URL::asset('js/jquery.validate.min.js') }}"></script>
@stop

@section('content')
    <a class="button create" href="#" id='create-bt' style="margin-top: 5px;">{{trans('lang.create_user')}}</a>

    <table data-toggle="table" class="table table-condensed"
           data-search="true"
           data-show-refresh="true"
           data-show-columns="true"
           data-url="/users/list"
           data-pagination="true"
           data-api_token = {{\Session::get('token')}}
           data-search="true"
           data-page-size=10
           data-response-handler="responseHandler"
           id="table-user"
            >
        <thead>
        <tr>
            <th data-field="index" data-align="right" data-formatter="indexFormatter"
                data-halign="center">{{trans('lang.index')}}</th>
            <th data-field="email" data-sortable="true" data-align="left" data-halign="center">{{trans('lang.email')}}</th>
            <th data-field="first_name" data-align="left" data-halign="center">{{trans('lang.first_name')}}</th>
            <th data-field="last_name" data-align="left" data-halign="center">{{trans('lang.last_name')}}</th>
            @if(Session::get('user_type') == 'Admin')
            <th data-field="license_name" data-align="left" data-halign="center">{{trans('lang.license')}}</th>
            @endif
            <th data-field="activated" data-sortable="true" data-formatter="activatedFormatter" data-align="center"
                data-halign="center">{{trans('lang.activated')}}</th>
            <th data-field="operate" data-formatter="operateFormatter" data-events="operateEvents" data-align="center"
                data-halign="center">{{trans('lang.actions')}}</th>
        </tr>
        </thead>
    </table>
@stop

@section('modal')
    <!-- Reset password Modal -->
    <div class="modal visionone-modal" id="resetPassModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="{{trans('lang.close')}}"><span
                                aria-hidden="true">&times;</span></button>
                    <h1 class="page-title" id="deleteuserTitle">{{ trans('lang.reset_password') }}</h1>
                </div>
                {{ Form::open(['id' => 'form-reset-password']) }}
                <div class="modal-body">
                    {{ Form::label('answer', trans('lang.do_you_want_to_reset_password_user')) }}
                    <input class="hidden" type="text" name="id_reset" id="id_reset" value=""/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">{{trans('lang.no')}}</button>
                    <button type="submit" class="btn btn-primary" id="reset-pass-bt">{{trans('lang.yes')}}</button>
                </div>
                {{ Form::close() }}
            </div>
        </div>
    </div>

    <!-- Delete Modal -->
    <div class="modal visionone-modal" id="delModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="{{trans('lang.close')}}"><span
                                aria-hidden="true">&times;</span></button>
                    <h1 class="page-title" id="deleteuserTitle">{{ trans('lang.delete') }}</h1>
                </div>
                {{ Form::open(['id' => 'form-delete_user']) }}
                <div class="modal-body">
                    {{ Form::label('answer', trans('lang.do_you_want_to_delete_user')) }}
                    <input class="hidden" type="text" name="id" id="id" value=""/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">{{trans('lang.no')}}</button>
                    <button type="submit" class="btn btn-primary" id="delete-bt">{{trans('lang.yes')}}</button>
                </div>
                {{ Form::close() }}
            </div>
        </div>
    </div>

    <!-- Edit Modal -->
    <div class="modal visionone-modal" id="editModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="{{trans('lang.close')}}"><span
                                aria-hidden="true">&times;</span></button>
                    <h1 class="page-title" id="page-title-create"
                        style="display: none">{{ trans('lang.create_user') }}</h1>

                    <h1 class="page-title" id="page-title-edit" style="display: none">{{ trans('lang.edit_user') }}</h1>
                </div>
                {{ Form::open(['id' => 'form-user'])}}
                <div class="modal-body">

                    @if(Session::get('create_errors'))
                        <div class="alert alert-danger alert-dismissable">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                            <h5>{{ trans('lang.error') }}</h5>
                        </div>
                    @endif
                    <div class="form-group">
                        {{ Form::label('email', trans('lang.email').'  *', [ 'class' => 'control-label' ]) }}
                        {{ Form::text('email', null, ['class'=>'form-control', 'id' => 'email', 'maxlength' => 100])}}
                    </div>

                    @if(Session::get('user_type') == 'SubAdmin')
                        <div class="form-group">
                            {{ Form::label('select_role', trans('lang.select_role'), [ 'class' => 'control-label' ]) }}
                            {{ Form::select('list_roles', [] , '',['class'=>'selectpicker form-control', 'multiple data-live-search'=>'true', 'id' => 'list_roles']) }}
                        </div>
                    @endif

                    <div class="form-group">
                        {{ Form::label('first_name', trans('lang.first_name').'  *', [ 'class' => 'control-label' ]) }}
                        {{ Form::text('first_name', null, ['class'=>'form-control', 'id' => 'first_name', 'maxlength' => 100])}}
                    </div>

                    <div class="form-group">
                        {{ Form::label('last_name', trans('lang.last_name').'  *', [ 'class' => 'control-label' ]) }}
                        {{ Form::text('last_name', null, ['class'=>'form-control', 'id' => 'last_name', 'maxlength' => 100])}}
                    </div>

                    <div class="form-group">
                        {{ Form::label('activated', trans('lang.activated'), [ 'class' => 'control-label' ]) }}
                        {{ Form::select('activated', [] , '',['class'=>'form-control', 'id' => 'activated']) }}
                    </div>
                    <input class="hidden" type="text" name="userId" id="userId" value=""/>
                    <input class="hidden" type="text" name="email_tmp" id="email_tmp" value=""/>
                    <input class="hidden" type="text" name="method" id="method" value=""/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default"
                            data-dismiss="modal">{{trans('lang.cancel')}}</button>
                    <button type="submit" class="btn btn-primary"
                            id="save-bt-update">{{trans('lang.save')}}</button>
                </div>
                {{Form::token() . Form::close()}}
            </div>
        </div>
    </div>

    {{--view detail--}}
    <div class="modal visionone-modal" id="viewModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="{{trans('lang.close')}}"><span
                                aria-hidden="true">&times;</span></button>
                    <h1 class="page-title">{{ trans('lang.user_detail') }}</h1>
                </div>
                {{ Form::open(['id' => 'form-view-user'])}}
                <div class="modal-body form-horizontal">
                    {{ Form::label('view_email', trans('lang.email'), [ 'class' => 'control-label text-left' ]) }}
                    {{ Form::text('view_email', null, ['class'=>'form-control', 'id' => 'view_email'])}}

                    {{ Form::label('view_activated', trans('lang.activated'), [ 'class' => 'control-label text-left' ]) }}
                    {{ Form::text('view_activated', null, ['class'=>'form-control', 'id' => 'view_activated'])}}

                    {{ Form::label('view_first_name', trans('lang.first_name'), [ 'class' => 'control-label text-left' ]) }}
                    {{ Form::text('view_first_name', null, ['class'=>'form-control', 'id' => 'view_first_name'])}}

                    {{ Form::label('view_last_name', trans('lang.last_name'), [ 'class' => 'control-label text-left' ]) }}
                    {{ Form::text('view_last_name', null, ['class'=>'form-control', 'id' => 'view_last_name'])}}

                    {{ Form::label('view_created_at', trans('lang.created_at'), [ 'class' => 'control-label text-left' ]) }}
                    {{ Form::text('view_created_at', null, ['class'=>'form-control', 'id' => 'view_created_at'])}}

                    {{ Form::label('view_updated_at', trans('lang.updated_at'), [ 'class' => 'control-label text-left' ]) }}
                    {{ Form::text('view_updated_at', null, ['class'=>'form-control', 'id' => 'view_updated_at'])}}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal"
                            id="bt-close">{{trans('lang.close')}}</button>
                </div>
                {{Form::token() . Form::close()}}
            </div>
        </div>
    </div>

    <!-- Apply License Modal -->
    <div class="modal visionone-modal" id="applyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="{{trans('lang.close')}}"><span
                                aria-hidden="true">&times;</span></button>
                    <h1 class="page-title" id="page-title-create">{{ trans('lang.apply_license') }}</h1>
                </div>
                {{ Form::open(['id' => 'form-apply-license', 'name' => 'form-apply-license'])}}
                <div class="modal-body">
                    @if(Session::get('create_errors'))
                        <div class="alert alert-danger alert-dismissable">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                            <h5>{{ trans('lang.error') }}</h5>
                        </div>
                    @endif
                    <div class="form-group">
                        {{ Form::label('name', trans('lang.manager_name'), [ 'class' => 'control-label' ]) }}
                        {{ Form::text('name', null, ['class'=>'form-control', 'id' => 'name', 'maxlength' => 100])}}
                    </div>
                    <div class="form-group">
                        {{ Form::label('current_expire_date', trans('lang.current_expire_date'), [ 'class' => 'control-label' ]) }}
                        {{ Form::text('current_expire_date', null, ['class'=>'form-control', 'id' => 'current_expire_date', 'maxlength' => 100  ])}}
                    </div>
                    <div class="form-group">
                        {{ Form::label('current_license_name', trans('lang.current_license_name'), [ 'class' => 'control-label' ]) }}
                        {{ Form::text('current_license_name', null, ['class'=>'form-control', 'id' => 'current_license_name', 'maxlength' => 100  ])}}
                    </div>
                    <div class="form-group">
                        <div class="vertical-align">
                            {{ Form::label('license', trans('lang.license').'  *', [ 'class' => 'control-label' ]) }}
                            <img src="{{asset('img/ajax-loader.gif')}}" id="loading-license" style="display:block"
                                 class="loading-ajax"/>
                            <img src="{{asset('img/error.jpg')}}" id="error-license" style="display:none"
                                 class="loading-ajax"/>
                        </div>
                        {{ Form::select('apply_license_id', [], '',['class'=>'form-control', 'id' => 'apply_license_id']) }}
                    </div>
                    <div class="form-group">
                        {{ Form::label('license_duration', trans('lang.license_duration'), [ 'class' => 'control-label' ]) }}
                        {{ Form::select('license_duration', [] , '',['class'=>'form-control', 'id' => 'license_duration']) }}
                    </div>
                    <div class="form-group">
                        {{ Form::label('description', trans('lang.user'), [ 'class' => 'control-label text-left' ]) }}
                        <div class="progress">
                            <div id="user_used" class="progress-bar progress-bar-warning" role="progressbar"
                                 style="width:0%">
                                {{trans('lang.used')}}
                            </div>
                            <div id="user_free" class="progress-bar progress-bar-success" role="progressbar"
                                 style="width:100%">
                                {{trans('lang.free')}}
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        {{ Form::label('description', trans('lang.device'), [ 'class' => 'control-label text-left' ]) }}
                        <div class="progress">
                            <div id="device_used" class="progress-bar progress-bar-warning" role="progressbar"
                                 style="width:0%">
                                {{trans('lang.used')}}
                            </div>
                            <div id="device_free" class="progress-bar progress-bar-success" role="progressbar"
                                 style="width:100%">
                                {{trans('lang.free')}}
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        {{ Form::label('description', trans('lang.file'), [ 'class' => 'control-label text-left' ]) }}
                        <div class="progress">
                            <div id="file_used" class="progress-bar progress-bar-warning" role="progressbar"
                                 style="width:0%">
                                {{trans('lang.used')}}
                            </div>
                            <div id="file_free" class="progress-bar progress-bar-success" role="progressbar"
                                 style="width:100%">
                                {{trans('lang.free')}}
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        {{ Form::label('description', trans('lang.storage'), [ 'class' => 'control-label text-left' ]) }}
                        <div class="progress">
                            <div id="storage_used" class="progress-bar progress-bar-warning" role="progressbar"
                                 style="width:0%">
                                {{trans('lang.used')}}
                            </div>
                            <div id="storage_free" class="progress-bar progress-bar-success" role="progressbar"
                                 style="width:100%">
                                {{trans('lang.free')}}
                            </div>
                        </div>
                    </div>
                    <input class="hidden" type="text" name="manager_id" id="manager_id" value=""/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default"
                            data-dismiss="modal">{{trans('lang.cancel')}}</button>
                    <button type="submit" class="btn btn-primary" id="save-bt-update-license"
                            name="save-bt-update-license">{{trans('lang.save')}}</button>
                </div>
                {{Form::token() . Form::close()}}
            </div>
        </div>
    </div>

@stop