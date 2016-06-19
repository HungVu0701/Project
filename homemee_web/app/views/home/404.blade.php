@section('title', trans('lang.not_found_page'))

@section('scripts-bottom')
@stop

@section('scripts')
    <script src="{{ URL::asset('js/notify.min.js') }}"></script>
@stop


@section('content')
    <h1>
        {{trans('lang.not_found_page')}}
    </h1>
@stop