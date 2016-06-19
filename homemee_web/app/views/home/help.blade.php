@section('title', trans('lang.help_center'))

@section('styles')
    <link rel="stylesheet" href="{{ URL::asset('css/bootstrap-nav-wizard.css')}}">
@stop

@section('content')
<div style="font-size: 16px; font-weight: bold; color: #474747">
    {{trans('lang.quick_guide')}}
</div>
<ul class='nav nav-wizard' style="border-bottom-width: 0px;">
    <li class="active"><a href='#step1' data-toggle="tab" title="{{trans('document.step1_l1')}}">{{trans('lang.step')}} 1</a></li>
    <li><a href='#step2' data-toggle="tab" title="{{trans('document.step2_l1')}}">{{trans('lang.step')}} 2</a></li>
    <li><a href='#step3' data-toggle="tab" title="{{trans('document.step3_l1')}}">{{trans('lang.step')}} 3</a></li>
    <li><a href='#step4' data-toggle="tab" title="{{trans('document.step4_l1')}}">{{trans('lang.step')}} 4</a></li>
    <li><a href='#step5' data-toggle="tab" title="{{trans('document.step5_l1')}}">{{trans('lang.step')}} 5</a></li>
    <li><a href='#step6' data-toggle="tab" title="{{trans('document.step6_l1')}}">{{trans('lang.step')}} 6</a></li>
    <li><a href='#step7' data-toggle="tab" title="{{trans('document.step7_l1')}}">{{trans('lang.step')}} 7</a></li>
    <li><a href='#step8' data-toggle="tab" title="{{trans('document.step8_l1')}}">{{trans('lang.step')}} 8</a></li>
</ul>

<div id="myTabContent" class="tab-content">
    <div class="tab-pane active modal-body" id="step1">
        <label>{{trans('document.step1_l1')}}</label>
        <p>{{trans('document.step1_p1')}}</p>
        <img class="img-responsive" src="{{trans('document.step1_img1')}}">
        <p>{{trans('document.step1_p2')}}</p>
        <img class="img-responsive" src="{{trans('document.step1_img2')}}">
    </div>
    <div class="tab-pane fade modal-body" id="step2">
        <label>{{trans('document.step2_l1')}}</label>
        <p>{{trans('document.step2_p1')}}</p>
        <img class="img-responsive" src="{{trans('document.step2_img1')}}">
    </div>
    <div class="tab-pane fade modal-body" id="step3">
        <label>{{trans('document.step3_l1')}}</label>
        <p>{{trans('document.step3_p1')}}</p>
        <img class="img-responsive" src="{{trans('document.step3_img1')}}">
        <p>{{trans('document.step3_p2')}}</p>
        <img class="img-responsive" src="{{trans('document.step3_img2')}}">
        <p>{{trans('document.step3_p2_i1')}}</p>
        <p>{{trans('document.step3_p2_i2')}}</p>
        <p>{{trans('document.step3_p2_i3')}}</p>
        <p>{{trans('document.step3_p2_i4')}}</p>
    </div>
    <div class="tab-pane fade modal-body" id="step4">
        <label>{{trans('document.step4_l1')}}</label>
        <p>{{trans('document.step4_p1')}}</p>
        <p>{{trans('document.step4_p2')}}</p>
        <img class="img-responsive" src="{{trans('document.step4_img1')}}">
        <p>{{trans('document.step4_p3')}}</p>
        <p>{{trans('document.step4_p3_i1')}}</p>
        <p>{{trans('document.step4_p3_i2')}}</p>
        <p>{{trans('document.step4_p3_i3')}}</p>
        <p>{{trans('document.step4_p3_i4')}}</p>
        <p>{{trans('document.step4_p3_i5')}}</p>
    </div>
    <div class="tab-pane fade modal-body" id="step5">
        <label>{{trans('document.step5_l1')}}</label>
        <p>{{trans('document.step5_p1')}}</p>
        <img class="img-responsive" src="{{trans('document.step5_img1')}}">
    </div>
    <div class="tab-pane fade modal-body" id="step6">
        <label>{{trans('document.step6_l1')}}</label>
        <p>{{trans('document.step6_p1')}}</p>
        <p>{{trans('document.step6_p1_i1')}}</p>
        <img class="img-responsive" src="{{trans('document.step6_img1')}}">
        <p>{{trans('document.step6_p1_i2')}}</p>
        <img class="img-responsive" src="{{trans('document.step6_img2')}}">
        <p>{{trans('document.step6_p1_i3')}}</p>
        <img class="img-responsive" src="{{trans('document.step6_img3')}}">
        <p>{{trans('document.step6_p1_i4')}}</p>
        <img class="img-responsive" src="{{trans('document.step6_img4')}}">
        <p>{{trans('document.step6_p1_i5')}}</p>
        <img class="img-responsive" src="{{trans('document.step6_img5')}}">
        <p>{{trans('document.step6_p1_i6')}}</p>
        <img class="img-responsive" src="{{trans('document.step6_img6')}}">
    </div>
    <div class="tab-pane fade modal-body" id="step7">
        <label>{{trans('document.step7_l1')}}</label>
        <p>{{trans('document.step7_p1')}}</p>
        <img class="img-responsive" src="{{trans('document.step7_img1')}}">
    </div>
    <div class="tab-pane fade modal-body" id="step8">
        <label>{{trans('document.step8_l1')}}</label>
        <p>{{trans('document.step8_p1')}}</p>
        <img class="img-responsive" src="{{trans('document.step8_img1')}}">
    </div>
</div>
@stop
