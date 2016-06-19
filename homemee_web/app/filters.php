<?php
use Controllers\BaseController;
App::before(function($request) {
    xss::globalXssClean();
    $language = Session::get('language',1);
    if($language == 0){
        \App::setLocale('vi');
    }else{
        \App::setLocale('en');
    }
});


App::after(function($request, $response) {

});

Route::filter('auth', function() {
    try {
        if (!\Session::has('token') || \Session::get('token') == null ||
            (!\Session::has('session_expired_time') || ((time() - \Session::get('session_expired_time')) > \Config::get('visionone.session_expired_time')))) {
            BaseController::cleanSession();
            if (Request::ajax()) {
                return Response::json(array('msg'=>'visionone_not_authenticated'), 401);
            } else {
                return Redirect::guest('login');
            }
        } else {
            if(Request::path() == 'login') {
                return Redirect::to('/informs');
            }
        }

        $user = \DB::table('user')->find(\Session::get('user_id'));
        if ($user->activated != 1) {
            BaseController::cleanSession();
            if (Request::ajax()) {
                return Response::json(array('msg'=>'visionone_not_authenticated'), 401);
            } else {
                return Redirect::guest('login');
            }
        }

        if ($user->api_token != \Session::get('token')) {
            BaseController::cleanSession();
            if (Request::ajax()) {
                return Response::json(array('msg'=>'visionone_not_authenticated'), 401);
            } else {
                return Redirect::guest('login');
            }
        }
    } catch (\Exception $ex) {
        BaseController::cleanSession();
        return Redirect::guest('login');
    }
});

Route::filter('auth.basic', function() {
	return Auth::basic();
});

Route::filter('guest', function() {
	if (Auth::check()) {
        return Redirect::to('/informs');
    }
});

Route::filter('csrf', function() {
    $url = Request::url();
    if (\Session::get('vision_one_token') !== Input::get('vision_one_token')
        && strpos($url,'contents/') === false && strpos($url,'login') === false) {
        if (Request::ajax()) {
            return BaseController::response(array(
                'msg' => 'visionone_lose_session',
                'method' => "post",
                'status' => \Config::get('constants.Unauthorized')
            ));
        } else {
            return Redirect::to('/404');
        }
    }
});

function processRequest($route, $request) {
    if (isset($_SERVER['HTTPS']) &&
        ($_SERVER['HTTPS'] == 'on' || $_SERVER['HTTPS'] == 1) ||
        isset($_SERVER['HTTP_X_FORWARDED_PROTO']) &&
        $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https'
    ) {
        $protocol = 'https://';
    } else {
        $protocol = 'http://';
    }

    $permission = '';
    $resource_type = '';
    $resource_id = '-1';
    $prefixUrl = $protocol . Request::server("HTTP_HOST") .'/';
    $subUrlStr = substr(Request::url(), strlen($prefixUrl));
    $method = Request::getMethod();
    $subUrls = explode("/", $subUrlStr);
    $subUrlCount = count($subUrls);
    $permission .= $method;

    if ($subUrlCount > 0) {
        $resource_type = substr($subUrls[0], 0, strlen($subUrls[0]) - 1);
    }

    switch ($subUrlCount) {
        case 2:
            $permission .= '_'.$subUrls[0].'_'.$subUrls[1];
            $resource_id = -1;
            break;
        case 3:
            $permission .= '_'.$subUrls[0].'_'.$subUrls[2];
            $resource_id = $subUrls[1];
            break;
        default:
            break;
    }
    return array(
        'permission'=>strtoupper($permission),
        'resource_type'=>$resource_type,
        'resource_id'=>$resource_id,
        'method'=>$method
    );
}

Route::filter('permission', function ($route, $request) {
    try {
        $user = app('user');
        $userId = $user->id;
        $userType = $user->type;
        $permissionData = processRequest($route, $request);
        switch($userType) {
            case 'Admin':
                $permissionData['resource_id'] = -1;
                $permissionData['resource_type'] = 'admin';
                break;
            case 'SubAdmin':
                $permissionData['resource_id'] = -1;
                $permissionData['resource_type'] = 'subadmin';
                break;
            case 'User':
                if ($permissionData['resource_id'] == -1) {
                    $permissionData['resource_type'] = 'user';
                }
                break;
            default:
                break;
        }
        \Log::debug('>>>>>> '.$permissionData['permission'].' >>>>>> '.$permissionData['resource_type'].' >>>>>> '.$permissionData['resource_id']);
        if ('content' == $permissionData['resource_type']) {
            $tempContent = \Content::find($permissionData['resource_id']);
            if ($tempContent != null) {
                $permissionData['resource_id'] = $tempContent->folder_permission_id;
                \Log::debug('change resource permission: '.$permissionData['resource_id']);
            } else {
                \Log::debug('not found resource permission <<<<<<');
                return BaseController::response(array(
                    'msg' => 'visionone_forbidden',
                    'method' => $permissionData['method'],
                    'status' => \Config::get('constants.Forbidden')
                ));
            }
        }

        $count = \DB::table('user_role_map')
            ->where('user_role_map.user_id', '=', $userId)
            ->where('user_role_map.resource_id', '=', $permissionData['resource_id'])
            ->join('role', 'user_role_map.role_id', '=', 'role.id')
            ->join('role_feature_map', 'role.id', '=', 'role_feature_map.role_id')
            ->join('feature', 'role_feature_map.feature_id', '=', 'feature.id')
            ->where('feature.signature_func', '=', $permissionData['permission'])->count();
        if ($count > 0) {
            \Log::debug('HAVE PERMISSION <<<<<<');
            return;
        } else {
            \Log::debug('NOT PERMISSION <<<<<<');
            return BaseController::response(array(
                'msg' => 'visionone_forbidden',
                'method' => $permissionData['method'],
                'status' => \Config::get('constants.Forbidden')
            ));
        }

    } catch (\Exception $ex) {
        \Log::error($ex);
        return BaseController::response(array(
            'msg' => 'visionone_permission_error',
            'method' => 'get',
            'status' => \Config::get('constants.Internal_Server_Error')
        ));
    }
});

Route::filter('api_token', function ($route, $request) {
    $token = $request->header('Api-Token');
    \Log::debug($token);
    if ($token == null) {
        return \Response::make(array('msg'=>'visionone_not_authenticated'),
            \Config::get('constants.Unauthorized'));
    } else {
        $user = User::where('api_token', '=', $token)->first();
        if ($user == null) {
            return \Response::make(array('msg'=>'visionone_not_authenticated'),
                \Config::get('constants.Unauthorized'));
        } else {
            if ((time() - \Session::get('session_expired_time')) > \Config::get('visionone.session_expired_time')) {
                return \Response::make(array('msg'=>'visionone_not_authenticated'),
                    \Config::get('constants.Unauthorized'));
            } else {
                App::instance('user', $user);
            }
        }
    }
});