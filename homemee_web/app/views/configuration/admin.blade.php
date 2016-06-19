@section('title', trans('lang.all_configurations'))

@section('styles')
    <link rel="stylesheet" href="{{ URL::asset('css/bootstrap-table.css')}}">
    <link rel="stylesheet" href="{{ URL::asset('css/timepicki.css')}}">
@stop

@section('scripts')
    <script src="{{ URL::asset('js/bootstrap-table.js') }}"></script>
    <script src="{{ URL::asset('js/notify.min.js') }}"></script>
    <script src="{{ URL::asset('js/timepicki.js') }}"></script>
@stop

@section('scripts-bottom')
    @include('javascript.configuration')
    <script src="{{ URL::asset('js/jquery.validate.min.js') }}"></script>
@stop

@section('content')
    <h3>{{trans('lang.configurations')}}</h3>
    {{ Form::open(['id' => 'configuration-form'])}}
    <div class="panel-group">
        <div class="panel panel-default">

            <div class="panel-heading">
                <a data-toggle="collapse" data-target="#configure-image" href="#configure-image"> {{trans('lang.configure_image')}}</a>
            </div>
            <div id="configure-image" class="panel-collapse collapse out">
                <div class="col-sm-4 col-md-4" style="padding-top: 10px; padding-bottom: 10px; height: {{Config::get('visionone.thumbnail_image_width')}}px;">
                    <label> {{trans('lang.select_vertical_screen_saver')}}</label>
                    <input type="file" name="fileToUpload1" id="fileToUpload1" style="max-width: 250px;">
                    <img style="max-width: {{Config::get('visionone.thumbnail_image_width')}}px;margin-top: 5px; margin-bottom: 5px;"
                         id="screen1">
                </div>
                <div class="col-sm-4 col-md-4" style="padding-top: 10px; padding-bottom: 10px; height: {{Config::get('visionone.thumbnail_image_width')}}px;">
                    <label> {{trans('lang.select_horizontal_screen_saver')}}</label>
                    <input type="file" name="fileToUpload2" id="fileToUpload2" style="max-width: 250px;">
                    <img style="max-width: {{Config::get('visionone.thumbnail_image_width')}}px;margin-top: 5px; margin-bottom: 5px;"
                         id="screen2">
                </div>
                <div style="padding: 10px 15px; height: {{Config::get('visionone.thumbnail_image_width')}}px;">
                    <label> {{trans('lang.select_default_content')}}</label>
                    <input type="file" name="fileToUpload3" id="fileToUpload3" style="max-width: 250px;">
                    <img style="max-width: {{Config::get('visionone.thumbnail_image_width')}}px;margin-top: 5px; margin-bottom: 5px;"
                         id="screen3">
                </div>
            </div>

            {{--Download Config--}}
            <div class="panel-heading">
                <a data-toggle="collapse" data-target="#configure-download-time" href="#configure-download-time"> {{trans('lang.configure_download_time')}}</a>
            </div>
            <div id="configure-download-time" class="panel-collapse collapse out">
                <div class="col-sm-4 col-md-4" style="padding-top: 10px; padding-bottom: 10px;">
                    <div><label style="margin-top: 5px;">{{trans('lang.start_time_download')}}:</label></div>
                    <div><label style="margin-top: 5px;">{{trans('lang.time_interval_for_download')}}:</label></div>
                </div>
                <div class="col-sm-3 col-md-3" style="padding-top: 10px; padding-bottom: 10px;">
                    {{ Form::text('download-time', null, ['class'=>'form-control download_time timepicki', 'id' => 'download-time', 'maxlength' => 100])}}
                    {{ Form::number('download-interval', null, ['class'=>'form-control download_interval', 'id' => 'download_interval', 'maxlength' => 2, 'style'=>'margin-top: 5px;'])}}
                </div>
                <div style="padding-top: 10px; padding-bottom: 75px;"></div>
            </div>

            {{--Reboot Config--}}
            <div class="panel-heading">
                <a data-toggle="collapse" data-target="#configure-reboot-time" href="#configure-reboot-time"> {{trans('lang.configure_reboot_time')}}</a>
            </div>
            <div id="configure-reboot-time" class="panel-collapse collapse out">
                <div class="col-sm-4 col-md-4" style="padding-top: 10px; padding-bottom: 10px;">
                    <label style="margin-top: 5px;">{{trans('lang.reboot_time')}}:</label>
                </div>
                <div class="col-sm-3 col-md-3" style="padding-top: 10px; padding-bottom: 10px;">
                    {{ Form::text('reboot-time', null, ['class'=>'form-control reboot_time timepicki', 'id' => 'reboot-time', 'maxlength' => 100])}}
                </div>
                <div style="padding-top: 10px; padding-bottom: 35px;"></div>
            </div>

            <div class="panel-heading">
                <a data-toggle="collapse" data-target="#configure-time-interval" href="#configure-time-interval"> {{trans('lang.configure_time_interval_log')}}</a>
            </div>
            <div id="configure-time-interval" class="panel-collapse collapse out">
                <div class="col-sm-4 col-md-4" style="padding-top: 10px; padding-bottom: 10px;">
                    <div><label style="margin-top: 13px;">{{trans('lang.event_logger_interval')}}:</label></div>
                    <div><label style="margin-top: 13px;">{{trans('lang.play_logger_interval')}}:</label></div>
                    <div><label style="margin-top: 13px;">{{trans('lang.statistic_logger_fast_mode_interval')}}:</label></div>
                    <div><label style="margin-top: 13px;">{{trans('lang.statistic_logger_low_mode_interval')}}:</label></div>
                    <div><label style="margin-top: 13px;">{{trans('lang.screenshot_interval')}}:</label></div>
                </div>
                <div class="col-sm-3 col-md-3" style="padding-top: 10px; padding-bottom: 10px;">
                    {{ Form::number('event_logger_interval', null, ['class'=>'form-control', 'id' => 'event_logger_interval', 'min' => '1', 'style'=>'margin-top: 5px;'])}}
                    {{ Form::number('play_logger_interval', null, ['class'=>'form-control', 'id' => 'play_logger_interval', 'min' => '1', 'style'=>'margin-top: 5px;'])}}
                    {{ Form::number('statistic_logger_fast_mode_interval', null, ['class'=>'form-control', 'id' => 'statistic_logger_fast_mode_interval', 'min' => '1', 'style'=>'margin-top: 5px;'])}}
                    {{ Form::number('statistic_logger_low_mode_interval', null, ['class'=>'form-control', 'id' => 'statistic_logger_low_mode_interval', 'min' => '1', 'style'=>'margin-top: 5px;'])}}
                    {{ Form::number('screenshot_interval', null, ['class'=>'form-control', 'id' => 'screenshot_interval', 'min' => '1', 'style'=>'margin-top: 5px;'])}}
                </div>
                <div style="padding-top: 10px; padding-bottom: 210px;"></div>
            </div>
        </div>
    </div>
    <div class="modal-footer" style="margin-top: 10px; padding-right: 0px;">
        <button type="button" class="btn btn-primary" id="bt-save">{{trans('lang.save')}}</button>
    </div>
    {{Form::token() . Form::close()}}
@stop

@section('modal')
    {{--save modal--}}
    <div class="modal visionone-modal" id="saveModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="{{trans('lang.close')}}"><span
                                aria-hidden="true">&times;</span></button>
                    <h1 class="page-title" id="deleteTenantTitle">{{ trans('lang.save') }}</h1>
                </div>
                {{ Form::open(['id' => 'form-save-configuration']) }}
                <div class="modal-body">
                    {{ Form::label('answer', trans('lang.do_you_want_to_save_configuration')) }}
                    <input class="hidden" type="text" name="id" id="id" value=""/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default"
                            data-dismiss="modal">{{ trans('lang.no') }}</button>
                    <button type="button" class="btn btn-primary"
                            id="bt-save-configuration">{{ trans('lang.yes') }}</button>
                </div>
                {{ Form::close() }}
            </div>
        </div>
    </div>
@stop
