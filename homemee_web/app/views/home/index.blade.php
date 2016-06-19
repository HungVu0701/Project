@section('title', trans('lang.welcome'))

@section('scripts-bottom')
    {{--@include('javascript.tenant_configuration')--}}
@stop

@section('scripts')
    <script src="{{ URL::asset('js/notify.min.js') }}"></script>
@stop


@section('content')
    {{trans('lang.coming_soon')}}
@stop