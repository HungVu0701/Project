@section('title', trans('lang.all_informs'))

@section('styles')
    <link rel="stylesheet" href="{{ URL::asset('css/bootstrap-table.css')}}">
@stop

@section('scripts')
    <script src="{{ URL::asset('js/bootstrap-table.js') }}"></script>
    <script src="{{ URL::asset('js/notify.min.js') }}"></script>
@stop

@section('scripts-bottom')
    @include('javascript.inform')
    <script src="{{ URL::asset('js/jquery.validate.min.js') }}"></script>
@stop

@section('content')
    <div class="box">
        <div class="box-header">
            <h3 class="box-title">{{trans('lang.all_informs')}}</h3>
        </div>
        <div class="box-body">
            <p>
                <button class="btn btn-warning" type="button" id='create-bt'><i class="fa fa-plus"></i> {{trans('lang.create_inform')}}</button>
            </p>

            <table data-toggle="table" class="table table-condensed"
                   data-search="true"
                   data-show-refresh="true"
                   data-show-columns="true"
                   data-url="/informs"
                   data-pagination="true"
                   data-api_token="{{\Session::get('token')}}"
                   data-page-size=10
                   data-response-handler="responseHandler"
                   id="table-informs"
            >
                <thead>
                <tr>
                    <th data-field="index" data-align="right" data-formatter="indexFormatter"
                        data-halign="center">{{trans('lang.index')}}</th>
                    <th data-field="sms_content" data-sortable="true" data-align="left"
                        data-halign="center">{{trans('lang.sms_content')}}</th>
                    <th data-field="title" data-sortable="true" data-align="left"
                        data-halign="center">{{trans('lang.title')}}</th>
                    <th data-field="content" data-sortable="true" data-align="left"
                        data-halign="center">{{trans('lang.content')}}</th>
                    <th data-field="state" data-sortable="true" data-align="center"
                        data-halign="center">{{trans('lang.state')}}</th>
                    <th data-field="uri_content" data-sortable="true" data-align="center" data-visible="false"
                        data-halign="center">{{trans('lang.uri_content')}}</th>
                    <th data-field="type" data-sortable="true" data-align="center"
                        data-halign="center">{{trans('lang.type')}}</th>
                    <th data-field="available" data-sortable="true" data-align="center"
                        data-halign="center">{{trans('lang.available')}}</th>
                    <th data-field="updated_at" data-sortable="true" data-align="center" data-visible="false"
                        data-halign="center">{{trans('lang.updated_at')}}</th>

                    <th data-field="operate" data-formatter="operateFormatter" data-events="operateEvents" data-align="center"
                        data-halign="center">{{trans('lang.actions')}}</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
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
                {{ Form::open(['id' => 'form-delete-inform']) }}
                <div class="modal-body">
                    {{ Form::label('answer', trans('lang.do_you_want_to_delete_inform')) }}
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
                    <h1 class="page-title" id="page-title-create">{{ trans('lang.create_inform') }}</h1>
                    <h1 class="page-title" id="page-title-edit" style="display: none">{{ trans('lang.edit_inform') }}</h1>
                </div>
                {{ Form::open(['id' => 'form-edit-inform'])}}
                <div class="modal-body">
                    @if(Session::get('create_errors'))
                        <div class="alert alert-danger alert-dismissable">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                            <h5>{{ trans('lang.error') }}</h5>
                        </div>
                    @endif
                    <div class="form-group">
                        {{ Form::label('sms_content', trans('lang.sms_content').'  *', [ 'class' => 'control-label' ]) }}
                        {{ Form::textarea('sms_content', null,array('class'=>'form-control','size' => '1x2','style'=>'resize:none', 'id' => 'sms_content','maxlength' => 200)) }}
                    </div>
                    <div class="form-group">
                        {{ Form::label('title', trans('lang.title').'  *', [ 'class' => 'control-label' ]) }}
                        {{ Form::text('title', null, ['class'=>'form-control', 'id' => 'title', 'maxlength' => 100])}}
                    </div>
                    <div class="form-group">
                        {{ Form::label('content', trans('lang.content'), [ 'class' => 'control-label' ]) }}
                        {{ Form::textarea('content', null,array('class'=>'form-control','size' => '1x2','style'=>'resize:none', 'id' => 'content','maxlength' => 1000)) }}
                    </div>

                    <div class="form-group">
                        {{ Form::label('date', trans('lang.date'), [ 'class' => 'control-label' ]) }}
                        <div class="input-group date">
                            <div class="input-group-addon">
                                <i class="fa fa-calendar"></i>
                            </div>
                            {{ Form::text('available', null, ['class'=>'form-control pull-right', 'id' => 'available'])}}
                        </div>
                    </div>

                    <input class="hidden" type="text" name="informId" id="informId" value=""/>
                    <input class="hidden" type="text" name="method" id="method" value=""/>
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

    <!-- Publish Modal -->
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
                    {{ Form::label('answer', trans('lang.do_you_want_to_publish_inform')) }}
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
@stop
