@section('title', trans('lang.all_licenses'))

@section('styles')
    <link rel="stylesheet" href="{{ URL::asset('css/bootstrap-table.css')}}">
@stop

@section('scripts')
    <script src="{{ URL::asset('js/bootstrap-table.js') }}"></script>
    <script src="{{ URL::asset('js/notify.min.js') }}"></script>
@stop

@section('scripts-bottom')
    @include('javascript.license')
    <script src="{{ URL::asset('js/jquery.validate.min.js') }}"></script>
@stop

@section('content')
    <a class="button create" href="#" id='create-bt' style="margin-top: 5px;">{{trans('lang.create_license')}}</a>
    <table data-toggle="table" class="table table-condensed"
           data-search="true"
           data-show-refresh="true"
           data-show-columns="true"
           data-url="/informs"
           data-pagination="true"
           data-api_token="{{\Session::get('token')}}"
           data-page-size=10
           data-response-handler="responseHandler"
           id="table-license"
            >
        <thead>
        <tr>
            <th data-field="index" data-align="right" data-formatter="indexFormatter"
                data-halign="center">{{trans('lang.index')}}</th>
            <th data-field="name" data-sortable="true" data-align="left"
                data-halign="center">{{trans('lang.name')}}</th>
            <th data-field="description" data-sortable="true" data-align="left"
                data-halign="center">{{trans('lang.descriptions')}}</th>
            <th data-field="max_device" data-align="center" data-halign="center">{{trans('lang.max_device')}}</th>
            <th data-field="max_user" data-align="center" data-halign="center">{{trans('lang.max_user')}}</th>
            <th data-field="max_store_size" data-align="center"
                data-halign="center">{{trans('lang.max_store_size')}}</th>
            <th data-field="max_file_count" data-align="center"
                data-halign="center">{{trans('lang.max_file_count')}}</th>
{{--            <th data-field="created_at" data-align="center" data-halign="center">{{trans('lang.created_at')}}</th>--}}
            <th data-field="updated_at" data-align="center" data-halign="center">{{trans('lang.updated_at')}}</th>
            <th data-field="operate" data-formatter="operateFormatter" data-events="operateEvents" data-align="center"
                data-halign="center">{{trans('lang.actions')}}</th>
        </tr>
        </thead>
    </table>
    @stop
    @section('modal')
            <!-- Delete Modal -->
    <div class="modal visionone-modal" id="delModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="{{trans('lang.close')}}"><span
                                aria-hidden="true">&times;</span></button>
                    <h1 class="page-title" id="deleteLicenseTitle">{{ trans('lang.delete') }}</h1>
                </div>
                {{ Form::open(['id' => 'form-delete-license']) }}
                <div class="modal-body">
                    {{ Form::label('answer', trans('lang.do_you_want_to_delete_license')) }}
                    <input class="hidden" type="text" name="id" id="id" value=""/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default"
                            data-dismiss="modal">{{ trans('lang.no') }}</button>
                    <button type="submit" class="btn btn-primary" id="delete-bt">{{ trans('lang.yes') }}</button>
                </div>
                {{ Form::close() }}
            </div>
        </div>
    </div>

    <!-- Create Modal -->
    <div class="modal visionone-modal" id="editModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="{{trans('lang.close')}}"><span
                                aria-hidden="true">&times;</span></button>
                    <h1 class="page-title" id="page-title-create">{{ trans('lang.create_license') }}</h1>

                    <h1 class="page-title" id="page-title-edit"
                        style="display: none">{{ trans('lang.edit_license') }}</h1>
                </div>
                {{ Form::open(['id' => 'form-license'])}}
                <div class="modal-body">
                    @if(Session::get('create_errors'))
                        <div class="alert alert-danger alert-dismissable">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                            <h5>{{ trans('lang.error') }}</h5>
                        </div>
                    @endif
                    <div class="form-group">
                        {{ Form::label('name', trans('lang.name').'  *', [ 'class' => 'control-label' ]) }}
                        {{ Form::text('name', null, ['class'=>'form-control', 'id' => 'name', 'maxlength' => 100])}}
                    </div>
                    <div class="form-group">
                        {{ Form::label('max_device', trans('lang.max_device').'  *', [ 'class' => 'control-label' ]) }}
                        {{ Form::number('max_device', null, ['class'=>'form-control', 'id' => 'max_device', 'maxlength' => 100])}}
                    </div>
                    <div class="form-group">
                        {{ Form::label('max_user', trans('lang.max_user').'  *', [ 'class' => 'control-label' ]) }}
                        {{ Form::number('max_user', null, ['class'=>'form-control', 'id' => 'max_user', 'maxlength' => 100])}}
                    </div>
                    <div class="form-group">
                        {{ Form::label('max_store_size', trans('lang.max_store_size').'  *', [ 'class' => 'control-label' ]) }}
                        {{ Form::number('max_store_size', null, ['class'=>'form-control', 'id' => 'max_store_size', 'maxlength' => 100])}}
                    </div>
                    <div class="form-group">
                        {{ Form::label('max_file_count', trans('lang.max_file_count').'  *', [ 'class' => 'control-label' ]) }}
                        {{ Form::number('max_file_count', null, ['class'=>'form-control', 'id' => 'max_file_count', 'maxlength' => 100])}}
                    </div>
                    <div class="form-group">
                        {{ Form::label('description', trans('lang.descriptions'), [ 'class' => 'control-label' ]) }}
                        {{ Form::textarea('description', null,array('class'=>'form-control','size' => '1x2','style'=>'resize:none', 'id' => 'description','maxlength' => 1000)) }}
                    </div>
                    <input class="hidden" type="text" name="licenseId" id="licenseId" value=""/>
                    <input class="hidden" type="text" name="method" id="method" value=""/>
                    <input class="hidden" type="text" name="name_tmp" id="name_tmp" value=""/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default"
                            data-dismiss="modal">{{ trans('lang.cancel') }}</button>
                    <button type="submit" class="btn btn-primary"
                            id="save-bt-update">{{ trans('lang.save') }}</button>
                </div>
                {{Form::token() . Form::close()}}
            </div>
        </div>
    </div>

    <!--Using Modal-->
    <div class="modal visionone-modal" id="usingModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="{{trans('lang.close')}}"><span
                                aria-hidden="true">&times;</span></button>
                    <h1 class="page-title">{{ trans('lang.user_using') }}</h1>
                </div>
                <div class="modal-body form-horizontal">
                    <table data-toggle="table" class="table table-condensed"
                           data-show-refresh="true"
                           data-show-columns="true"
                           data-pagination="true"
                           data-api_token="{{\Session::get('token')}}"
                           data-search="true"
                           data-page-size=10
                           data-response-handler="responseHandler"
                           id="table-tenant-using"
                            >
                        <thead>
                        <tr>
                            <th data-field="index" data-align="right" data-formatter="indexFormatter"
                                data-halign="center">{{trans('lang.index')}}</th>
                            <th data-field="name" data-sortable="true" data-align="left" data-halign="center"
                                data-width=2>{{trans('lang.name')}}</th>
                            <th data-field="expire_date" data-sortable="true" data-align="left" data-halign="center"
                                data-width=2>{{trans('lang.expire_date')}}</th>
                            <th data-field="license_data" data-align="left"
                                data-halign="center">{{trans('lang.license_data')}}</th>
                            <th data-field="current_license_data" data-align="left"
                                data-halign="center">{{trans('lang.current_license_data')}}</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal"
                            id="bt-close">{{trans('lang.close')}}</button>
                </div>
            </div>
        </div>
    </div>
@stop
