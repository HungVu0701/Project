@section('title', trans('lang.permission'))

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
    @include('javascript.user_setting')
    <script src="{{ URL::asset('js/jquery.validate.min.js') }}"></script>
@stop

@section('content')
    <div id="content">
        <div class="row vdivide">
            <div class="col-sm-3">
                <ul id="tabs" class="nav nav-tabs" data-tabs="tabs">
                    <li class="active"><a href="#user_info" data-toggle="tab">{{trans('lang.user_info')}}</a></li>
                </ul>
                <div class="tab-content">
                    <div id="user_info" class="tab-pane fade active in">
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
                                {{ Form::text('email', null, ['class'=>'form-control disable', 'id' => 'email', 'maxlength' => 100])}}
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
                            {{Form::token() . Form::close()}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-9">
                <ul id="tabs" class="nav nav-tabs" data-tabs="tabs">
                    {{--<li class="active"><a href="#user_info" data-toggle="tab">{{trans('lang.user_info')}}</a></li>--}}
                    <li class="active"><a href="#device_permission"
                                          data-toggle="tab">{{trans('lang.device_permission')}}</a></li>
                    <li><a href="#content_permission" data-toggle="tab">{{trans('lang.content_permission')}}</a></li>
                    <li><a href="#layout_permission" data-toggle="tab">{{trans('lang.layout_permission')}}</a></li>
                    <li><a href="#campaign_permission" data-toggle="tab">{{trans('lang.campaign_permission')}}</a></li>
                    <li><a href="#ticker_permission" data-toggle="tab">{{trans('lang.ticker_permission')}}</a></li>
                </ul>
                {{--start div tab--}}
                <div id="my-tab-content" class="tab-content">
                    <div class="tab-pane active" id="device_permission">
                        <div class="modal-body">
                            <a class="button create" href="#"
                               id='btn_add_device_permission'>{{ trans('lang.add_role_for_user') }}</a>
                            <table data-toggle="table" class="table table-condensed"
                                   data-search="true"
                                   data-show-refresh="true"
                                   data-show-columns="true"
                                   data-pagination="true"
                                   data-page-size=10
                                   data-api_token = {{\Session::get('token')}}
                                   data-response-handler="responseHandler"
                                   id="tb_device_permission">
                                <thead>
                                <tr>
                                    <th data-field="index" data-align="right" data-formatter="indexFormatter"
                                        data-halign="center">{{trans('lang.index')}}</th>
                                    <th data-field="resource_name" data-sortable="true" data-align="left"
                                        data-halign="center"
                                        data-width="30%">{{trans('lang.device')}}</th>
                                    <th data-field="roleName" data-sortable="true" data-align="left"
                                        data-halign="center"
                                        data-width="50%">{{trans('lang.roles')}}</th>
                                    <th data-field="operate" data-formatter="operateFormatterTable2"
                                        data-events="operateEvents"
                                        data-align="center" data-halign="center">{{trans('lang.actions')}}</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane" id="content_permission">
                        <div class="modal-body">
                            <a class="button create" href="#"
                               id='btn_add_content_permission'>{{ trans('lang.add_role_for_user') }}</a>
                            <table data-toggle="table" class="table table-condensed"
                                   data-search="true"
                                   data-show-refresh="true"
                                   data-show-columns="true"
                                   data-pagination="true"
                                   data-page-size=10
                                   data-api_token = {{\Session::get('token')}}
                                   data-response-handler="responseHandler"
                                   id="tb_content_permission">
                                <thead>
                                <tr>
                                    <th data-field="index" data-align="right" data-formatter="indexFormatter"
                                        data-halign="center">{{trans('lang.index')}}</th>
                                    <th data-field="resource_name" data-sortable="true" data-align="left"
                                        data-halign="center"
                                        data-width="30%">{{trans('lang.contents')}}</th>
                                    <th data-field="roleName" data-sortable="true" data-align="left"
                                        data-halign="center"
                                        data-width="50%">{{trans('lang.roles')}}</th>
                                    <th data-field="operate" data-formatter="operateFormatterTable2"
                                        data-events="operateEvents"
                                        data-align="center" data-halign="center">{{trans('lang.actions')}}</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane" id="layout_permission">
                        <div class="modal-body">
                            <a class="button create" href="#"
                               id='btn_add_layout_permission'>{{ trans('lang.add_role_for_user') }}</a>
                            <table data-toggle="table" class="table table-condensed"
                                   data-search="true"
                                   data-show-refresh="true"
                                   data-show-columns="true"
                                   data-pagination="true"
                                   data-api_token = {{\Session::get('token')}}
                                   data-page-size=10
                                   data-response-handler="responseHandler"
                                   id="tb_layout_permission">
                                <thead>
                                <tr>
                                    <th data-field="index" data-align="right" data-formatter="indexFormatter"
                                        data-halign="center">{{trans('lang.index')}}</th>
                                    <th data-field="resource_name" data-sortable="true" data-align="left"
                                        data-halign="center"
                                        data-width="30%">{{trans('lang.layouts')}}</th>
                                    <th data-field="roleName" data-sortable="true" data-align="left"
                                        data-halign="center"
                                        data-width="50%">{{trans('lang.roles')}}</th>
                                    <th data-field="operate" data-formatter="operateFormatterTable2"
                                        data-events="operateEvents"
                                        data-align="center" data-halign="center">{{trans('lang.actions')}}</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane" id="campaign_permission">
                        <div class="modal-body">
                            <a class="button create" href="#"
                               id='btn_add_campaign_permission'>{{ trans('lang.add_role_for_user') }}</a>
                            <table data-toggle="table" class="table table-condensed"
                                   data-show-refresh="true"
                                   data-show-columns="true"
                                   data-pagination="true"
                                   data-search="true"
                                   data-page-size=10
                                   data-api_token = {{\Session::get('token')}}
                                   data-response-handler="responseHandler"
                                   id="tb_campaign_permission">
                                <thead>
                                <tr>
                                    <th data-field="index" data-align="right" data-formatter="indexFormatter"
                                        data-halign="center">{{trans('lang.index')}}</th>
                                    <th data-field="resource_name" data-sortable="true" data-align="left"
                                        data-halign="center"
                                        data-width="30%">{{trans('lang.campaigns')}}</th>
                                    <th data-field="roleName" data-sortable="true" data-align="left"
                                        data-halign="center"
                                        data-width="50%">{{trans('lang.roles')}}</th>
                                    <th data-field="operate" data-formatter="operateFormatterTable2"
                                        data-events="operateEvents"
                                        data-align="center" data-halign="center">{{trans('lang.actions')}}</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>

                    <div class="tab-pane" id="ticker_permission">
                        <div class="modal-body">
                            <a class="button create" href="#"
                               id='btn_add_ticker_permission'>{{ trans('lang.add_role_for_user') }}</a>
                            <table data-toggle="table" class="table table-condensed"
                                   data-search="true"
                                   data-show-refresh="true"
                                   data-show-columns="true"
                                   data-pagination="true"
                                   data-page-size=10
                                   data-api_token = {{\Session::get('token')}}
                                   data-response-handler="responseHandler"
                                   id="tb_ticker_permission">
                                <thead>
                                <tr>
                                    <th data-field="index" data-align="right" data-formatter="indexFormatter"
                                        data-halign="center">{{trans('lang.index')}}</th>
                                    <th data-field="resource_name" data-sortable="true" data-align="left"
                                        data-halign="center"
                                        data-width="30%">{{trans('lang.tickers')}}</th>
                                    <th data-field="roleName" data-sortable="true" data-align="left"
                                        data-halign="center"
                                        data-width="50%">{{trans('lang.roles')}}</th>
                                    <th data-field="operate" data-formatter="operateFormatterTable2"
                                        data-events="operateEvents"
                                        data-align="center" data-halign="center">{{trans('lang.actions')}}</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                {{--end div tab--}}
            </div>
        </div>
    </div>
@stop

@section('modal')
    <!-- add Modal -->
    <div class="modal visionone-modal" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="{{trans('lang.close')}}"><span
                                aria-hidden="true">&times;</span></button>
                    <h1 class="page-title">{{ trans('lang.add_role_for_user') }}</h1>
                </div>

                {{ Form::open(['id' => 'form-add-role']) }}
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <p id="title_select_resource">{{trans('lang.select_user')}}</p>
                                {{ Form::select('resource_name', [] , '',['class'=>'selectpicker', 'multiple data-live-search'=>'true', 'id' => 'resource_name']) }}
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <p>{{trans('lang.select_role')}}</p>
                                {{ Form::select('roles', [] , '',['class'=>'selectpicker', 'multiple data-live-search'=>'true', 'id' => 'roles']) }}
                            </div>
                        </div>
                    </div>

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default"
                            data-dismiss="modal">{{ trans('lang.cancel') }}</button>
                    <button type="submit" class="btn btn-primary" id="bt-save-new">{{ trans('lang.save') }}</button>
                </div>
                {{ Form::close() }}
            </div>
        </div>
    </div>

    {{--edit modal--}}
    <div class="modal visionone-modal" id="editModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="{{trans('lang.close')}}"><span
                                aria-hidden="true">&times;</span></button>
                    <h1 class="page-title">{{ trans('lang.edit_role') }}</h1>
                </div>

                {{ Form::open(['id' => 'form-edit-role']) }}
                <div class="modal-body">
                    <table>
                        <tr>
                            <td><p>{{trans('lang.select_role')}}</p></td>
                        </tr>

                        <tr>
                            <td>
                                {{ Form::select('resource_roles', [] , '',['class'=>'selectpicker', 'multiple data-live-search'=>'true', 'id' => 'resource_roles']) }}
                                <input class="hidden" type="text" name="resource_id" id="resource_id" value=""/>
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default"
                            data-dismiss="modal">{{ trans('lang.cancel') }}</button>
                    <button type="submit" class="btn btn-primary" id="bt-save-edit">{{ trans('lang.save') }}</button>
                </div>
                {{ Form::close() }}
            </div>
        </div>
    </div>
@stop
