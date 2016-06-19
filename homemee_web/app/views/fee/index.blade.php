@section('title', trans('lang.all_fees'))

@section('styles')
    <link rel="stylesheet" href="{{ URL::asset('css/bootstrap-table.css')}}">
@stop

@section('scripts')
    <script src="{{ URL::asset('js/bootstrap-table.js') }}"></script>
    <script src="{{ URL::asset('js/notify.min.js') }}"></script>
@stop

@section('scripts-bottom')
    @include('javascript.fee')
    <script src="{{ URL::asset('js/jquery.validate.min.js') }}"></script>
@stop

@section('content')
    <div class="box">
        <div class="box-header">
            <h3 class="box-title">{{trans('lang.all_fees')}}</h3>
        </div>
        <div class="box-body">
            <p>
                <button class="btn btn-warning" type="button" id='upload_fee_list_id'><i class="fa fa-upload"></i> {{trans('lang.import_data')}}</button>
            </p>
            <div class="row">
                <div class="col-md-2">
                    <select class="form-control" disabled="">
                        <option>{{trans('lang.month')}} 6</option>
                        <option>{{trans('lang.month')}} 7</option>
                        <option>{{trans('lang.month')}} 8</option>
                        <option>{{trans('lang.month')}} 9</option>
                        <option>{{trans('lang.month')}} 10</option>
                        <option>{{trans('lang.month')}} 11</option>
                        <option>{{trans('lang.month')}} 12</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <select class="form-control" disabled="">
                        <option>2016</option>
                        <option>2017</option>
                        <option>2018</option>
                    </select>
                </div>
            </div>
            <table data-toggle="table" class="table table-condensed"
                   data-search="true"
                   data-show-refresh="true"
                   data-show-columns="true"
                   data-url="/fees"
                   data-pagination="true"
                   data-api_token="{{\Session::get('token')}}"
                   data-page-size=10
                   data-response-handler="responseHandler"
                   id="table-fees">
                <thead>
                <tr>
                    <th data-field="index" data-align="right" data-formatter="indexFormatter"
                        data-halign="center">{{trans('lang.index')}}</th>
                    <th data-field="room_name" data-sortable="true" data-align="left"
                        data-halign="center">{{trans('lang.room_name')}}</th>
                    <th data-field="state" data-sortable="true" data-align="left"
                        data-halign="center">{{trans('lang.state')}}</th>
                    <th data-field="manager_fee" data-sortable="true" data-align="left"
                        data-halign="center">{{trans('lang.manager_fee')}}</th>
                    <th data-field="bicycle_fee" data-sortable="true" data-align="left"
                        data-halign="center">{{trans('lang.bicycle_fee')}}</th>
                    <th data-field="auto_fee" data-sortable="true" data-align="left"
                        data-halign="center">{{trans('lang.auto_fee')}}</th>
                    <th data-field="moto_fee" data-sortable="true" data-align="left"
                        data-halign="center">{{trans('lang.moto_fee')}}</th>
                    <th data-field="water_fee" data-sortable="true" data-align="left"
                        data-halign="center">{{trans('lang.water_fee')}}</th>
                    <th data-field="water_num_first" data-sortable="true" data-align="left" data-visible="false"
                        data-halign="center">{{trans('lang.water_num_first')}}</th>
                    <th data-field="water_num_last" data-sortable="true" data-align="left" data-visible="false"
                        data-halign="center">{{trans('lang.water_num_last')}}</th>
                    <th data-field="water_num_used" data-sortable="true" data-align="left" data-visible="false"
                        data-halign="center">{{trans('lang.water_num_used')}}</th>
                    <th data-field="water_fee_unit" data-sortable="true" data-align="left" data-visible="false"
                        data-halign="center">{{trans('lang.water_fee_unit')}}</th>
                    <th data-field="operate" data-formatter="operateFormatter" data-events="operateEvents" data-align="center"
                        data-halign="center">{{trans('lang.actions')}}</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
@stop

@section('modal')
    <!-- publish Modal -->
    <div class="modal visionone-modal" id="publishModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="{{trans('lang.close')}}"><span
                                aria-hidden="true">&times;</span></button>
                    <h1 class="page-title" id="publishInformTitle">{{ trans('lang.publish') }}</h1>
                </div>
                {{ Form::open(['id' => 'form-publish-inform']) }}
                <div class="modal-body">
                    {{ Form::label('answer', trans('lang.do_you_want_to_publish_this_fee')) }}
                    <input class="hidden" type="text" name="id" id="id" value=""/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default"
                            data-dismiss="modal">{{ trans('lang.no') }}</button>
                    <button type="submit" class="btn btn-primary" id="publish-bt">{{ trans('lang.yes') }}</button>
                </div>
                {{ Form::close() }}
            </div>
        </div>
    </div>

    <!-- send sms Modal -->
    <div class="modal visionone-modal" id="smsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="{{trans('lang.close')}}"><span
                                aria-hidden="true">&times;</span></button>
                    <h1 class="page-title" id="publishInformTitle">{{ trans('lang.sms') }}</h1>
                </div>
                {{ Form::open(['id' => 'form-sms-inform']) }}
                <div class="modal-body">
                    {{ Form::label('answer', trans('lang.do_you_want_to_send_sms_this_fee')) }}
                    <input class="hidden" type="text" name="id" id="id" value=""/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default"
                            data-dismiss="modal">{{ trans('lang.no') }}</button>
                    <button type="submit" class="btn btn-primary" id="send-sms-bt">{{ trans('lang.yes') }}</button>
                </div>
                {{ Form::close() }}
            </div>
        </div>
    </div>

    {{--upload fee model--}}
    <div class="modal visionone-modal" id="uploadFeeListModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="{{trans('lang.close')}}"><span
                                aria-hidden="true">&times;</span></button>
                    <h1 class="page-title" id="page-title-create">{{ trans('lang.upload_fee_list') }}</h1>
                </div>

                {{ Form::open(['id' => 'form_upload_list_fee'])}}
                <div class="modal-body">
                    <div class="form-group">
                        <input id="fee_list" type="file" name="fee_list" style="max-width: 300px">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default"
                            data-dismiss="modal">{{trans('lang.cancel')}}</button>
                    <button type="submit" class="btn btn-primary">{{trans('lang.create')}}</button>
                </div>
                {{Form::token() . Form::close()}}

            </div>
        </div>
    </div>
@stop
