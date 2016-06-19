<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar" style="height: auto;">
        <!-- Sidebar user panel -->
        <div class="user-panel">
            <div class="pull-left image">
                <img alt="User Image" class="img-circle" src="/img/adminlte/user2-160x160.jpg">
            </div>
            <div class="pull-left info">
                <p>{{strlen(Session::get('username')) <= 10 ? Session::get('username') : substr(Session::get('username'), 0, 10).'...'}}</p>
                <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
        </div>
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu">
            <li class="header">{{trans('lang.main_navigation')}}</li>

            @if(!Session::get('token') || Session::get('flag_is_first_login') == '1')
            @else
            {{
                // sample setting
                //Session::set("token", "User");
                $user_type = '';
                if( Session::has('user_type')) {
                    $user_type = \Session::get('user_type');
                }
                $path = Request::url();
            }}

            {{--slide bar for admin--}}
            @if ($user_type == "Admin")
                @if (strpos($path,"/users") !== false)
                    <li class="active">
                @else
                    <li>
                @endif
                        <a href="/users/index">{{trans('lang.users')}}</a>
                    </li>

                @if (strpos($path,"/licenses") !== false)
                    <li class="active">
                @else
                    <li>
                @endif
                        <a href="/licenses/index">{{trans('lang.licenses')}}</a>
                    </li>

                @if (strpos($path,"/androids") !== false)
                    <li class="active">
                @else
                    <li>
                @endif
                        <a href="/androids/index">{{trans('lang.androids')}}</a>
                    </li>

                @if (strpos($path,"/configurations") !== false)
                    <li class="active">
                @else
                    <li>
                @endif
                        <a href="/configurations/index">{{trans('lang.configurations')}}</a>
                    </li>
                @endif
                {{--end of sidebar for admin--}}

                {{--slide bar for apartment_manager--}}
                @if ($user_type == "apartment_manager" or $user_type == 'apartment_member')
                    @if (strpos($path,"/informs") !== false)
                        <li class="active">
                    @else
                        <li>
                    @endif
                            <a href="/informs/index"><i class="fa fa-volume-up"></i> <span>{{trans('lang.informs')}}</span></a>
                        </li>

                    @if (strpos($path,"/fees") !== false)
                        <li class="active">
                    @else
                        <li>
                    @endif
                            <a href="/fees/index"><i class="fa fa-usd"></i> <span>{{trans('lang.fees')}}</span></a>
                        </li>

                    @if (strpos($path,"/residents") !== false)
                        <li class="active">
                    @else
                        <li>
                    @endif
                            <a href="/residents/index"><i class="fa fa-users"></i> <span>{{trans('lang.residents')}}</span></a>
                        </li>
                @endif
            @endif
        </ul>
    </section>
</aside>