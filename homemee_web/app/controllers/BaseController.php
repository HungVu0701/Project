<?php
namespace Controllers;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\View;
use GuzzleHttp;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class BaseController extends Controller {

    protected $layout = 'layouts.main';

    public function __construct() {
//        $this->beforeFilter('csrf', [ 'on' => 'post' ]);
    }

    protected function setupLayout() {
        if (! is_null($this->layout)) {
            $this->layout = \View::make($this->layout);
        }
    }

    protected function view($path, $data = []) {
        $this->layout->content = \View::make($path, \xss::arrayCleanTags($data));
    }

    protected function redirectRoute($route, $params = [], $data = []) {
        return \Redirect::route($route, $params)->with(\xss::arrayCleanTags($data));
    }

    protected function redirectBack($data = []) {
        return \Redirect::back()->withInput()->with(\xss::arrayCleanTags($data));
    }

    protected function redirectIntended($default = null) {
        return \Redirect::intended($default);
    }

    public function changeLanguage() {
        $rules = [
            'language' => 'in:0,1' //list of supported languages.
        ];

        $language = \Input::get('lang'); //lang is name of form select field.
        $validator = \Validator::make(compact($language),$rules);
        if($validator->passes()) {
            \Session::put('language',$language);
            if($language == 0){
                \App::setLocale('vi');
            }else{
                \App::setLocale('en');
            }
            return \Response::make(array(
                'data'=>\Session::get('language'),
                'status'=>200,
                'msg'=>null,
                'msgType'=>'success'
            ),200);
        } else {
            return \Response::make(array(
                'data'=>\Session::get('language'),
                'status'=>400,
                'msg'=>"Language not support",
                'msgType'=>'error'
            ),200);
        }
    }

    public static function response($result) {
        $msgType = 'success';
        if ('get' == strtolower($result['method'])) {
            if ($result['status'] == 200 || $result['status'] == 201) {
                $msg = null;
            } else {
                $msg = trans('notify.'.$result['msg']);
                $msgType = 'error';
            }
        } else {
            $msg = trans('notify.'.$result['msg']);
            if ($result['status'] == 200 || $result['status'] == 201) {
                $msgType = 'success';
            } else {
                $msgType = 'error';
            }
        }
        $result['msgType'] = $msgType;
        $result['msg'] = $msg;
        return $result;
    }

    public static function checkPermission($roles, $permission) {
        // Check whether $permission in array of a Role
        try {
            $idPermission = \Feature::where('name', '=', $permission)->get();
            if ($idPermission == null || count($idPermission) == 0)
                return false;
            for ($i = 0, $z = count($roles); $i < $z; $i++) {
                $roleFeatureRows = \RoleFeatureMap::where('role_id', '=', $roles[$i]['role_id'])->get();
                for ($j = 0, $q = count($roleFeatureRows); $j < $q; $j++) {
                    if ($idPermission[0]['id'] == $roleFeatureRows[$j]['feature_id']) {
                        return true;
                    }
                }
            }
            return false;
        } catch (\Exception $ex) {
            \Log::error($ex);
            return false;
        }
    }

    public static function getRole($idUser) {
        // Get role of a user in a project
        $roleMap = \UserRoleMap::where('user_id', '=', $idUser)->get();
        return $roleMap;
    }

    public static function cleanSession() {
        \Session::clear();
        \Session::migrate(true, 0);
    }

    public static function genTokenStr() {
        return str_random(40);
    }

    public static function createGetRequestOutSite($uri=null){

        try {
            $client = new Client(['base_url' => $uri]);
            $response = $client->get($uri);
            return json_decode($response->getBody(), $assoc = true);
        } catch (RequestException $e) {
            return null;
        }
    }

    public static function genThumbnail($sourcePath, $sourceName, $sourceExtension, $thumbPath) {
        $ffmpegPath = \Config::get('visionone.ffmpegPath');
        $ffprobePath = \Config::get('visionone.ffprobePath');
        $sourceFullName = ''.$sourceName.'.'.$sourceExtension;
        $thumbFullName = ''.$sourceName.'.jpg';

        $tWidth = \Config::get('visionone.thumbnail_image_width');
        $durationCmd = $ffprobePath . '  -v quiet -print_format compact=print_section=0:nokey=1:escape=none -show_entries stream=duration,width,height ' . $sourcePath . $sourceFullName;
        $durationStr = "";
        $retVal = 0;
        exec($durationCmd, $durationStr, $retVal);
        $image_list = explode('|', $durationStr[0]);
        $originalWidth = $image_list[0];
        $originalHeight = $image_list[1];
        // zoom follow width
        $tHeight = round($originalHeight * $tWidth / $originalWidth);
        if ($tHeight > $tWidth) {
            $tHeight = $tWidth;
            $tWidth = round($originalWidth * $tHeight / $originalHeight);
        }

        $cmd = $ffmpegPath . ' -i ' . $sourcePath . $sourceFullName . ' -vf scale=' . $tWidth . ':' . $tHeight . ' ' . $thumbPath . $thumbFullName;
        exec($cmd);

        return $thumbFullName;
    }

    public static function isExpire($manager_id)
    {
        $tenantLicense = \DB::table('subadmin_license')
            ->where('$manager_id', '=', $manager_id)
            ->where('expire_date', '>=', new \DateTime())
            ->first();
        if ($tenantLicense == null) {
            return true;
        }
        return false;
    }

    public static function checkLicense($type, $manager_id, $value)
    {
        try {
            $tenantLicense = \DB::table('subadmin_license')->where('manager_id', '=', $manager_id)->first();
            $json_license = json_decode($tenantLicense->license_data);
            $json_curr_license = json_decode($tenantLicense->current_license_data);

            if (strcmp($type, "USER") == 0) {
                if ($json_curr_license->curr_user + $value > $json_license->max_user) {
                    return false;
                } else
                    return true;
            } else if (strcmp($type, "FILE_COUNT") == 0) {
                if ($json_curr_license->curr_file_count + $value > $json_license->max_file_count) {
                    return false;
                } else
                    return true;
            } else if (strcmp($type, "FILE_STORE") == 0) {
                if ($json_curr_license->curr_store_size + $value > $json_license->max_store_size) {
                    return false;
                } else
                    return true;
            } else if (strcmp($type, "DEVICE") == 0) {
                if ($json_curr_license->curr_device + $value > $json_license->max_device) {
                    return false;
                } else
                    return true;
            }

            return false;
        } catch (\Exception $ex) {
            \Log::error($ex);
            return false;
        }
    }

    public static function updateCurrQuota($type, $manager_id, $value)
    {
        try {
            if ($manager_id == null) {
                return true;
            } else {
                $tenant_license = \DB::table('subadmin_license')->where('manager_id', '=', $manager_id)->first();
                $json_license = json_decode($tenant_license->license_data);
                $json_curr_license = json_decode($tenant_license->current_license_data);

                if (strcmp($type, "USER") == 0) {
                    $json_curr_license->curr_user = $json_curr_license->curr_user + $value;
                    if ($json_curr_license->curr_user < 0)
                        $json_curr_license->curr_user = 0;
                } else if (strcmp($type, "FILE_COUNT") == 0) {
                    $json_curr_license->curr_file_count = $json_curr_license->curr_file_count + $value;
                    if ($json_curr_license->curr_file_count < 0)
                        $json_curr_license->curr_file_count = 0;
                } else if (strcmp($type, "FILE_STORE") == 0) {
                    $json_curr_license->curr_store_size = $json_curr_license->curr_store_size + $value;
                    if ($json_curr_license->curr_store_size < 0)
                        $json_curr_license->curr_store_size = 0;
                } else if (strcmp($type, "DEVICE") == 0) {
                    $json_curr_license->curr_device = $json_curr_license->curr_device + $value;
                    if ($json_curr_license->curr_device < 0)
                        $json_curr_license->curr_device = 0;
                }
                \DB::table('subadmin_license')
                    ->where('manager_id', '=', $manager_id)
                    ->update(array('current_license_data' => json_encode($json_curr_license)));
                return true;
            }
        } catch (\Exception $ex) {
            \Log::error($ex);
            return false;
        }
    }
}
