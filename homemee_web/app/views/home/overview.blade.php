@section('title', trans('lang.overview'))

@section('styles')
    <link rel="stylesheet" href="{{ URL::asset('css/bootstrap-nav-wizard.css')}}">
@stop

@section('content')
    <div style="font-size: 16px; font-weight: bold; color: #474747">
        {{trans('lang.overview')}}
    </div>

    <div class="modal-body">
        <img class="img-responsive" src="{{trans('document.introduction_img1')}}">
        <img class="img-responsive" src="{{trans('document.introduction_img2')}}">
        <img class="img-responsive" src="{{trans('document.feature_img1')}}">
        <img class="img-responsive" src="{{trans('document.application_img1')}}">
        <img class="img-responsive" src="{{trans('document.application_img2')}}">
    </div>
@stop
