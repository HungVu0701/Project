@section('title', trans('lang.all_rooms'))

@section('styles')
    <link rel="stylesheet" href="{{ URL::asset('css/bootstrap-table.css')}}">
@stop

@section('scripts')
    <script src="{{ URL::asset('js/bootstrap-table.js') }}"></script>
    <script src="{{ URL::asset('js/notify.min.js') }}"></script>
@stop

@section('scripts-bottom')
    @include('javascript.room')
    <script src="{{ URL::asset('js/jquery.validate.min.js') }}"></script>
@stop

@section('content')
    <div class="box">
        <div class="box-header">
            <h3 class="box-title">{{trans('lang.all_rooms')}}</h3>
        </div>
        <div class="box-body">
            {{--<a class="button create" href="#" id='create-bt' style="margin-top: 5px;">{{trans('lang.create_inform')}}</a>--}}
            <table data-toggle="table" class="table table-condensed"
                   data-search="true"
                   data-show-refresh="true"
                   data-show-columns="true"
                   data-url="/rooms"
                   data-pagination="true"
                   data-api_token="{{\Session::get('token')}}"
                   data-page-size=10
                   data-response-handler="responseHandler"
                   id="table-rooms"
            >
                <thead>
                <tr>
                    <th data-field="index" data-align="right" data-formatter="indexFormatter"
                        data-halign="center">{{trans('lang.index')}}</th>
                    <th data-field="name" data-sortable="true" data-align="left"
                        data-halign="center">{{trans('lang.name')}}</th>
                    <th data-field="code" data-sortable="true" data-align="left"
                        data-halign="center">{{trans('lang.code')}}</th>
                    <th data-field="area" data-sortable="true" data-align="left"
                        data-halign="center">{{trans('lang.area')}}</th>
                    <th data-field="owner" data-align="center" data-halign="center">{{trans('lang.owner')}}</th>
                    <th data-field="first_name" data-sortable="true" data-align="left"
                        data-halign="center">{{trans('lang.first_name')}}</th>
                    <th data-field="last_name" data-sortable="true" data-align="left"
                        data-halign="center">{{trans('lang.last_name')}}</th>
                    <th data-field="state" data-align="center" data-halign="center">{{trans('lang.state')}}</th>

                    {{--<th data-field="created_at" data-align="center" data-halign="center">{{trans('lang.created_at')}}</th>--}}
                    {{--<th data-field="updated_at" data-align="center" data-halign="center">{{trans('lang.updated_at')}}</th>--}}
                    <th data-field="operate" data-formatter="operateFormatter" data-events="operateEvents" data-align="center"
                        data-halign="center">{{trans('lang.actions')}}</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
@stop

@section('modal')

@stop
