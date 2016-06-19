<?php

namespace Visionone\Repositories\Eloquent;

use Visionone\Repositories\UserRepositoryInterface;
use Controllers\BaseController;
use \Cartalyst\Sentry\Throttling\UserSuspendedException;
use \Cartalyst\Sentry\Users\UserNotActivatedException;
use Visionone\Services\Forms\UserForm;

class UserRepository extends AbstractRepository implements UserRepositoryInterface {

    public function login() {
        $data = \Input::all();
        unset($data['updated_at']);
        unset($data['captcha']);
        unset($data['vision_one_token']);
        unset($data['_token']);
        try {
            $user = \Sentry::authenticate($data, false);

            $token = hash('sha256', \Str::random(10), false);
            $user->api_token = $token;
            $user->session_expired_time = date("Y-m-d H:i:s", time() + \Config::get('visionone.session_expired_time'));
            $user->save();
            $result = true;
            $message = trans('notify.visionone_login_success');

            \Session::set('username', $user->email);
            \Session::set('token', $token);
            \Session::set('email', $user->email);
            \Session::set('first_name', $user->first_name);
            \Session::set('last_name', $user->last_name);
            \Session::set('user_id', $user->id);
            \Session::set('user_type', $user->type);
            \Session::set('session_expired_time', time());
            if (!\Session::has('login_times')) {
                \Session::set('login_times', 0);
            }
            \Session::set('is_first_login', $user->is_first_login);
        } catch (UserSuspendedException $userSuspended) {
            \Log::debug($userSuspended);
            $result = false;
            $message = trans('notify.visionone_login_error_user_suspended');
        } catch (UserNotActivatedException $userNotActivated) {
            \Log::debug($userNotActivated);
            $result = false;
            $message = trans('notify.visionone_login_error_user_in_activated');
        } catch (\Exception $e) {
            \Log::debug($e);
            $result = false;
            $message = trans('notify.visionone_login_error_bad_request');
        }
        \Session::set('error_message', $message);
        return $result;
    }

    public function loginApi() {
        $data = \Input::all();
        unset($data['updated_at']);
        unset($data['captcha']);
        unset($data['vision_one_token']);
        unset($data['_token']);

        $resultData = array();
        $message = "login_success";
        $status = \Config::get('constants.OK');

        try {
            $user = \Sentry::authenticate($data, false);
            $token = hash('sha256', \Str::random(10), false);
            $user->api_token = $token;
            $user->session_expired_time = date("Y-m-d H:i:s", time() + \Config::get('visionone.session_expired_time'));
            $user->save();
            $result = true;

            $rooms = \DB::table('room_owner')
                ->where('user_id', '=', $user->id)
                ->join('room', 'room.id', '=', 'room_owner.room_id')
                ->join('apartment', 'apartment.id', '=', 'room.apartment_id')
                ->get([
                    'apartment.id as apartment_id',
                    'apartment.code as apartment_code',
                    'apartment.name as apartment_name',
                    'apartment.address as apartment_address',
                    'apartment.descriptions as apartment_descriptions',
                    'room.name as room_name',
                ]);
            $resultData['username'] =  $user->email;
            $resultData['token'] = $token;
            $resultData['email'] = $user->email;
            $resultData['first_name'] = $user->first_name;
            $resultData['last_name'] = $user->last_name;
            $resultData['user_id'] = $user->id;
            $resultData['session_expired_time'] = $user->session_expired_time;
            $resultData['rooms'] = $rooms;
        } catch (UserSuspendedException $userSuspended) {
            \Log::debug($userSuspended);
            $result = false;
            $message = "visionone_login_error_user_suspended";
            $status = \Config::get('constants.Bad_Request');
        } catch (UserNotActivatedException $userNotActivated) {
            \Log::debug($userNotActivated);
            $result = false;
            $message = "visionone_login_error_user_in_activated";
            $status = \Config::get('constants.Bad_Request');
        } catch (\Exception $e) {
            \Log::debug($e);
            $result = false;
            $message = "visionone_login_error_bad_request";
            $status = \Config::get('constants.Bad_Request');
        }

        \Log::debug($resultData);
        return BaseController::response(array(
            'msg' => $message,
            'method' => 'post',
            'data' => $resultData,
            'status' => $status
        ));
    }

    public function findAll()
    {
        try {
            $userId = \Session::get('user_id');
            $userType = \Session::get('user_type');
            $users = null;
            if ($userType == 'Admin') {
//                $users = \DB::table('user')
//                    ->where('type', '=', 'SubAdmin')
//                    ->get(['id', 'email', 'activated', 'create_by', 'first_name', 'last_name', 'manager_id', 'created_at', 'updated_at', 'type']);

                $users = \DB::table('user')
                    ->leftJoin('subadmin_license', 'user.id', '=', 'subadmin_license.manager_id')
                    ->leftJoin('license', 'subadmin_license.license_id', '=', 'license.id')
                    ->where('type', '=', 'SubAdmin')
                    ->orderBy('user.updated_at', 'DESC')
                    ->selectRaw(\DB::raw(
                        'user.email as email,
                    user.created_at as created_at,
                    user.updated_at as updated_at,
                    user.activated as activated,
                    user.manager_id as manager_id,
                    user.first_name,
                    user.last_name,
                    user.id as id,
                    subadmin_license.id as subadmin_license_id,
                    subadmin_license.license_data as license_data,
                    subadmin_license.current_license_data as license_current_data,
                    subadmin_license.expire_date as expire_date,
                    subadmin_license.license_id as license_id,
                    license.name as license_name
                    '))->get();

            } else if ($userType == 'SubAdmin') {
                $users = \DB::table('user')
                    ->leftJoin('user_role_map', 'user_role_map.user_id', '=', 'user.id')
                    ->leftJoin('role', 'role.id', '=', 'user_role_map.role_id')
                    ->where('user.manager_id', '=', $userId)
                    ->selectRaw(\DB::raw(
                        'group_concat(role.name) as roleName,
                        group_concat(role.id) as roleIds,
                        user.id,
                        user.email,
                        user.activated,
                        user.create_by,
                        user.first_name,
                        user.last_name,
                        user.manager_id,
                        user.created_at,
                        user.updated_at,
                        user.type'))
                    ->groupBy('user.id')
                    ->get();
            } else {
                $users = null;
            }
            return BaseController::response(array(
                'msg' => 'visionone_get_user_success',
                'method' => 'get',
                'data' => $users,
                'status' => \Config::get('constants.OK')
            ));
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_get_user_error',
                'method' => 'get',
                'debug' => $ex->getMessage(),
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function delete($id)
    {
        try {
            $deleteUser = \User::find($id);
            if ($deleteUser == null) {
                return BaseController::response(array(
                    'msg' => 'visionone_user_not_found',
                    'method' => 'post',
                    'status' => \Config::get('constants.Bad_Request')
                ));
            } else {
                if ($deleteUser['type'] == 'Admin') {
                    return BaseController::response(array(
                        'msg' => 'visionone_delete_user_error_admin',
                        'method' => 'post',
                        'status' => \Config::get('constants.Bad_Request')
                    ));
                } else if ($deleteUser['type'] == 'SubAdmin') {
                    // 1. delete all subadmin data: campaign, layout, content, ticker, user, file_metadata
                    \Campaign::where('manager_id', '=', $id)->delete();
                    \CampaignJson::where('manager_id', '=', $id)->delete();
                    \Content::where('manager_id', '=', $id)->delete();
                    \DailyLayout::where('manager_id', '=', $id)->delete();
                    \Device::where('manager_id', '=', $id)->delete();
                    \FileMetadata::where('manager_id', '=', $id)->delete();
                    \Layout::where('manager_id', '=', $id)->delete();
                    \Template::where('manager_id', '=', $id)->delete();
                    \TextTicker::where('manager_id', '=', $id)->delete();
                    \User::where('manager_id', '=', $id)->delete();
                    \UserRoleMap::where('manager_id', '=', $id)->delete();
                    \WidgetInstance::where('manager_id', '=', $id)->delete();

                    // 2. delete user
                    \DB::table('user')->where('id', '=', $deleteUser['id'])->delete();
                    return BaseController::response(array(
                        'msg' => 'visionone_delete_user_success',
                        'method' => 'post',
                        'status' => \Config::get('constants.OK')
                    ));
                } else {
                    // 1. delete user role
                    \UserRoleMap::where('user_id', '=', $id)->delete();

                    // 2. change home to normal
                    \Content::where('org_name', '=', $deleteUser['email'])
                        ->where('folder_type', '=', 'home')
                        ->update(array('folder_type' => 'normal'));

                    // 2. Unlock campaign, layout
                    \Layout::where('locked_by', '=', $id)
                        ->update(['status' => 'release']);
                    \Campaign::where('locked_by', '=', $id)
                        ->update(['status' => 'release']);

                    // 3. delete user
                    \DB::table('user')->where('id', '=', $deleteUser['id'])->delete();
                    return BaseController::response(array(
                        'msg' => 'visionone_delete_user_success',
                        'method' => 'post',
                        'status' => \Config::get('constants.OK')
                    ));
                }
            }
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_delete_user_error',
                'method' => 'post',
                'debug' => $ex->getMessage(),
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function resetPassword($id) {
        try {
            $user = \Sentry::findUserById($id);
            if ($user !== null) {
                $user->password = \Config::get('visionone.password_default');
                if (\Config::get('visionone.change_pass_first_time') == true) {
                    $user->is_first_login = 1;
                }

                $user->save();
                return BaseController::response(array(
                    'msg' => 'visionone_reset_pass_user_success',
                    'method' => 'post',
                    'status' => \Config::get('constants.Created')
                ));
            } else {
                return BaseController::response(array(
                    'msg' => 'visionone_reset_pass_user_error_not_found',
                    'method' => 'post',
                    'status' => \Config::get('constants.Not_Found')
                ));
            }
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_reset_pass_user_error',
                'method' => 'post',
                'debug' => $ex->getMessage(),
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function findById($id) {
        try {
            $userId = \Session::get('user_id');
            $userType = \Session::get('user_type');
            $users = null;
            if ($userType == 'Admin') {
//                $users = \DB::table('user')
//                    ->where('type', '=', 'SubAdmin')
//                    ->where('id', '=', $id)
//                    ->get([
//                        'id', 'email', 'activated', 'create_by', 'first_name',
//                        'last_name', 'manager_id', 'created_at', 'updated_at', 'type']);

                $tenantInfo = \DB::table('user')
                    ->leftJoin('subadmin_license', 'user.id', '=', 'subadmin_license.manager_id')
                    ->leftJoin('license', 'subadmin_license.license_id', '=', 'license.id')
                    ->where('user.id', '=', $id)
                    ->selectRaw(\DB::raw(
                        'user.email as email,
                        license.name as license_name,
                        license.id as license_id,
                        subadmin_license.license_data as license_data,
                        subadmin_license.current_license_data as current_license_data,
                        subadmin_license.expire_date as expire_date,
                        user.created_at as created_at,
                        user.updated_at as updated_at'))->limit(1)->get();
                if ($tenantInfo != null) {
                    return BaseController::response(array(
                        'msg' => 'visionone_get_user_success',
                        'data' => $tenantInfo,
                        'method' => 'GET',
                        'status' => \Config::get('constants.OK')
                    ));
                } else {
                    return BaseController::response(array(
                        'msg' => 'visionone_get_user_error_not_found',
                        'method' => 'GET',
                        'status' => \Config::get('constants.Not_Found')
                    ));
                }
            } else if ($userType == 'SubAdmin') {
                $users = \DB::table('user')
                    ->leftJoin('user_role_map', 'user_role_map.user_id', '=', 'user.id')
                    ->leftJoin('role', 'role.id', '=', 'user_role_map.role_id')
                    ->where('user.manager_id', '=', $userId)
                    ->where('user.id', '=', $id)
                    ->selectRaw(\DB::raw(
                        'group_concat(role.name) as roleName,
                        group_concat(role.id) as roleIds,
                        user.id,
                        user.email,
                        user.activated,
                        user.create_by,
                        user.first_name,
                        user.last_name,
                        user.manager_id,
                        user.created_at,
                        user.updated_at,
                        user.type'
                    ))
                    ->groupBy('user.id')
                    ->get();
            } else {
                $users = null;
            }
            return BaseController::response(array(
                'msg' => 'visionone_get_user_success',
                'method' => 'get',
                'data' => $users,
                'status' => \Config::get('constants.OK')
            ));
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_get_user_error',
                'method' => 'get',
                'debug' => $ex->getMessage(),
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    private function validStrongPassword($pwd) {
        if (strlen($pwd) < 8 || !preg_match("#[0-9]+#", $pwd) ||
            !preg_match("#[a-z]+#", $pwd) || !preg_match("#[A-Z]+#", $pwd) ||
            !preg_match("#\\W+#", $pwd)
        ) {
            return false;
        }
        return true;
    }

    public function changePassword($id) {
        try {
            $userId = \Session::get('user_id');

            if ($id != $userId) {
                return BaseController::response(array(
                    'msg' => 'visionone_change_pass_user_error_not_found',
                    'method' => 'post',
                    'status' => \Config::get('constants.Bad_Request')
                ));
            }
            $data = \Input::all();
            $user = \Sentry::findUserById($id);

            $newPassword = $data['new_password'];
            $confirmNewPassword = $data['confirm_new_password'];
            $isValidNewPass = $this->validStrongPassword($newPassword);
            $isValidNewPassConfirm = $this->validStrongPassword($confirmNewPassword);

            if (!$isValidNewPass || !$isValidNewPassConfirm) {
                return BaseController::response(array(
                    'msg' => 'visionone_change_pass_user_error_not_strong',
                    'method' => 'post',
                    'status' => \Config::get('constants.Bad_Request')
                ));
            }

            if (($user->checkPassword($data['old_password']))
                and ($data['new_password'] == $data['confirm_new_password'])
            ) {
                $user->password = $data['new_password'];
                $user->is_first_login = 0;
                $user->save();
                \Session::set('flag_is_first_login', 0);
                return BaseController::response(array(
                    'msg' => 'visionone_change_pass_user_success',
                    'method' => 'post',
                    'status' => \Config::get('constants.Created')
                ));
            } else {
                return BaseController::response(array(
                    'msg' => 'visionone_change_pass_user_error',
                    'method' => 'post',
                    'status' => \Config::get('constants.Not_Found')
                ));
            }
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_change_pass_user_error',
                'method' => 'post',
                'debug' => $ex->getMessage(),
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    private function createUser() {
        try {
            $userId = \Session::get('user_id');
            $userType = \Session::get('user_type');

            $validator = new UserForm();
            if (!$validator->isCreateValid()) {
                return BaseController::response(array(
                    'msg' => 'visionone_create_user_error_bad_request',
                    'method' => 'post',
                    'status' => \Config::get('constants.Bad_Request')
                ));
            }

            $data = $validator->getInputData();
            $data['password'] = \Config::get('visionone.password_default');
            $data['create_by'] = $userId;
            $data['manager_id'] = $userId;
            unset($data['userId']);
            unset($data['email_tmp']);
            unset($data['method']);
            unset($data['is_first_login']);
            unset($data['list_roles']);

            if ($userType == 'Admin') {
                $max_subadmin = \Config::get('visionone.max_subadmin');
                if (\User::where('manager_id', '=', $userId)->count() >= $max_subadmin) {
                    return BaseController::response(array(
                        'msg' => 'visionone_create_user_error_reach_max_limit',
                        'method' => 'post',
                        'status' => \Config::get('constants.Bad_Request')
                    ));
                }
                $data['type'] = 'SubAdmin';
                unset($data['role_ids']);
            } else if ($userType == 'SubAdmin') {
                if (!BaseController::checkLicense("USER", $userId, 1)) {
                    return BaseController::response(array(
                        'msg' => 'visionone_create_user_error_reach_max_limit',
                        'debug' => "Reach to max quocta for license",
                        'method' => 'POST',
                        'status' => \Config::get('constants.Internal_Server_Error')
                    ));
                } else {
                    BaseController::updateCurrQuota("USER", $userId, 1);
                }
//                $max_user = \Config::get('visionone.max_user');
//                if (\User::where('manager_id', '=', $userId)->count() >= $max_user) {
//                    return BaseController::response(array(
//                        'msg' => 'visionone_create_user_error_reach_max_limit',
//                        'method' => 'post',
//                        'status' => \Config::get('constants.Bad_Request')
//                    ));
//                }
                $data['type'] = 'User';
                $roles = json_decode($data['role_ids']);
                unset($data['role_ids']);
            } else {
                return BaseController::response(array(
                    'msg' => 'visionone_create_user_error',
                    'method' => 'post',
                    'status' => \Config::get('constants.Bad_Request')
                ));
            }

            if (\Config::get('visionone.change_pass_first_time') == false) {
                $data['is_first_login'] = 0;
            }
            // create user
            $user = \Sentry::createUser($data);

            if ($user != null) {
                if ($user['type'] == 'SubAdmin') {
                    // create root folder for subadmin
                    GalleryRepository::createSpecialFolder($user['id'], $user['email'], $userId, 'root', null);
                    // grant subadmin role
                    $subadminRole = \Role::where('type', '=', 'subadmin')->first();
                    if ($subadminRole != null) {
                        \UserRoleMap::create(array('user_id' => $user['id'], 'role_id' => $subadminRole['id'],
                            'resource_id' => -1, 'manager_id' => $user['id']));
                    }
                } else if ($user['type'] == 'User') {
                    $results = array();
                    $err = false;

                    // auto create folder
                    // create public folder (first user create)
                    if (\Content::where('manager_id', '=', $userId)->where('folder_type', '=', 'public')->count() <= 0) {
                        GalleryRepository::createSpecialFolder($userId, 'Public', $userId, 'public', null);
                    }
                    // create home folder
                    GalleryRepository::createSpecialFolder($userId, $user['email'], $userId, 'home', $user['id']);
                    // add read on root for user
                    $rootFolder = \Content::where('folder_type', '=', 'root')->where('manager_id', '=', $user['manager_id'])->first();
                    $readFolderRole = \Role::where('name', '=', 'Read Folder')->first();
                    \UserRoleMap::create(array('user_id' => $user['id'], 'role_id' => $readFolderRole['id'],
                        'resource_id' => $rootFolder['id'], 'resource_type' => 'content', 'manager_id' => $user['manager_id']));

//                    $writeFolderRole = \Role::where('name', '=', 'Write Folder')->first();
//                    \UserRoleMap::create(array('user_id' => $user['id'], 'role_id' => $writeFolderRole['id'],
//                        'resource_id' => $rootFolder['id'], 'resource_type' => 'content', 'manager_id' => $user['manager_id']));

                    // general user role
                    $userRole = \Role::where('name', '=', 'User')->first();
                    \UserRoleMap::create(array('user_id' => $user['id'], 'role_id' => $userRole['id'],
                        'resource_id' => -1, 'resource_type' => 'user', 'manager_id' => $user['manager_id']));
                    // add new record
                    for ($i = 0, $role_size = count($roles); $i < $role_size; $i++) {
                        $role = \Role::find($roles[$i]);
                        if ($role != null and count($role) > 0) {
                            $tmp = array(
                                'user_id' => $user->id,
                                'role_id' => $roles[$i],
                                'manager_id' => $userId,
                                'resource_type' => $role->type
                            );
                            $results[] = \UserRoleMap::create($tmp);
                        } else {
                            $err = true;
                            break;
                        }
                    }
                    if ($err) {
                        for ($i = 0, $result_size = count($results); $i < $result_size; $i++) {
                            \UserRoleMap::destroy($results[$i]['id']);
                        }
                        \User::destroy($user->id);
                        return BaseController::response(array(
                            'msg' => 'visionone_create_user_error',
                            'method' => 'post',
                            'data' => $user,
                            'status' => \Config::get('constants.Internal_Server_Error')
                        ));
                    }
                }
                return BaseController::response(array(
                    'msg' => 'visionone_create_user_success',
                    'method' => 'post',
                    'data' => $user,
                    'status' => \Config::get('constants.Created')
                ));
            } else {
                return BaseController::response(array(
                    'msg' => 'visionone_create_user_error',
                    'method' => 'post',
                    'data' => $user,
                    'status' => \Config::get('constants.Internal_Server_Error')
                ));
            }
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_create_user_error',
                'method' => 'post',
                'debug' => $ex->getMessage(),
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    private function updateUser($id) {
        try {
            $userType = \Session::get('user_type');

            $validator = new UserForm();
            $data = $validator->getInputData();
            if ((!$validator->isUpdateValid())) {
                return BaseController::response(array(
                    'msg' => $validator->getErrors(),
                    'method' => 'post',
                    'status' => \Config::get('constants.Bad_Request')
                ));
            }

            if ($data['activated'] != null and ($data['activated'] == 0)) {
                $data['api_token'] = "";
            }

            if ($userType == 'Admin') {
                // update subadmin
                \User::find($id)->update($data);
            } else if ($userType == 'SubAdmin') {
                // update user
                $roles = json_decode($data['role_ids']);
                unset($data['role_ids']);
                $results = array();
                $err = false;
                //delete old record by project_id & user_id
                \DB::table('user_role_map')
                    ->join('role', 'user_role_map.role_id', '=', 'role.id')
                    ->where('user_role_map.user_id', '=', $id)
                    ->where('role.scope', '=', 0)
                    ->delete();

                //add new record
                for ($i = 0; $i < count($roles); $i++) {
                    $role = \Role::find($roles[$i]);
                    if ($role != null and count($role) > 0) {
                        $tmp = ['user_id' => $id,
                            'role_id' => $roles[$i]];
                        $results[] = \UserRoleMap::create($tmp);
                    } else {
                        $err = true;
                        break;
                    }
                }
                if ($err) {
                    for ($i = 0; $i < count($results); $i++) {
                        \UserRoleMap::destroy($results[$i]['id']);
                    }
                    return BaseController::response(array(
                        'msg' => 'visionone_update_user_error',
                        'method' => 'post',
                        'status' => \Config::get('constants.Internal_Server_Error')
                    ));
                }
            }

            return BaseController::response(array(
                'msg' => 'visionone_update_user_success',
                'method' => 'post',
                'data' => \User::find($id),
                'status' => \Config::get('constants.Created')
            ));
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_update_user_error',
                'method' => 'post',
                'debug' => $ex->getMessage(),
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function saveUser($id) {
        if ($id != null) {
            return $this->updateUser($id);
        } else {
            return $this->createUser();
        }
    }

    public function create(array $data) {

    }

    public function update(array $data) {

    }

    public function getAllRole() {
        try {
            $roles = \Role::where('scope', '=', 0)->get();
            return BaseController::response(array(
                'msg' => 'visionone_get_role_success',
                'data' => $roles,
                'method' => 'get',
                'status' => \Config::get('constants.OK')
            ));
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_get_role_error',
                'debug' => $ex->getMessage(),
                'method' => 'get',
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function getRolesByTypeResource() {
        try {
            $resource_type = \Input::get('resource_type');
            $roles = \Role::where('scope', '!=', 0)
                ->where('type', '=', $resource_type)->get();
            return BaseController::response(array(
                'msg' => 'visionone_get_role_success',
                'data' => $roles,
                'method' => 'get',
                'status' => \Config::get('constants.OK')
            ));
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_get_role_error',
                'debug' => $ex->getMessage(),
                'method' => 'get',
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function getResourceNotPermission($user_id) {
        try {
            $userId = \Session::get('user_id');
            $userType = \Session::get('user_type');
            $managerId = \Session::get('manager_id');
            if ($userType == 'SubAdmin') {
                $managerId = $userId;
            }

            $resource_type = \Input::get('resource_type');
            $resource = [];
            $resource_ids = \DB::table('user_role_map')
                ->join('user', 'user.id', '=', 'user_role_map.user_id')
                ->join('role', 'role.id', '=', 'user_role_map.role_id')
                ->where('role.type', '=', $resource_type)
                ->where('user_role_map.user_id', '=', $user_id)
                ->lists('user_role_map.resource_id');
            if ($resource_type == 'content') {
                $root = \DB::table('content')
                    ->where('manager_id', '=', $managerId)
                    ->where('folder_type', '=', 'root')->first();
                if ($root != null) {
                    if (count($resource_ids) > 0) {
                        $resource = \DB::table('content')
                            ->whereNotIn('id', $resource_ids)
                            ->where('manager_id', '=', $managerId)
                            ->where('content.folder_type', '=', 'normal')
                            ->where('content.is_folder', '=', 1)
                            ->where('content.parent_id', '=', $root->id)
                            ->get();
                    } else {
                        $resource = \DB::table($resource_type)
                            ->where('manager_id', '=', $managerId)
                            ->where('content.folder_type', '=', 'normal')
                            ->where('content.is_folder', '=', 1)
                            ->where('content.parent_id', '=', $root->id)
                            ->get();
                    }
                }
            } else {
                if (count($resource_ids) > 0) {
                    $resource = \DB::table($resource_type)->whereNotIn('id', $resource_ids)
                        ->where('manager_id', '=', $managerId)
                        ->get();
                } else {
                    $resource = \DB::table($resource_type)
                        ->where('manager_id', '=', $managerId)
                        ->get();
                }
            }
            return BaseController::response(array(
                'msg' => 'visionone_get_role_success',
                'data' => $resource,
                'method' => 'get',
                'status' => \Config::get('constants.OK')
            ));
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_get_role_error',
                'debug' => $ex->getMessage(),
                'method' => 'get',
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function addPermission() {
        try {
            $userId = \Session::get('user_id');
            $userType = \Session::get('user_type');
            $managerId = \Session::get('manager_id');
            if ($userType == 'SubAdmin') {
                $managerId = $userId;
            }
            if ($userType == 'SubAdmin') {
                $results = array();
                $err = false;
                $data = \Input::all();
                $roles = json_decode($data['role_ids']);
                $resources = json_decode($data['resource_ids']);
                $user_id = $data['user_id'];
                //add new record
                for ($j = 0, $resource_size = count($resources); $j < $resource_size; $j++) {

                    \DB::table('user_role_map')->where('resource_id', '=', $resources[$j])
                        ->where('user_id', '=', $user_id)
                        ->where('user_role_map.resource_type', '=', $data['resource_type'])
                        ->delete();

                    if(count($roles) == 0) {
                        if ($data['resource_type'] == 'campaign') {
                            \Campaign::where('id', '=', $resources[$j])
                                ->where('locked_by', '=', $user_id)
                                ->update(['status' => 'release']);
                        } else if ($data['resource_type'] == 'layout') {
                            \Layout::where('id', '=', $resources[$j])
                                ->where('locked_by', '=', $user_id)
                                ->update(['status' => 'release']);
                        }
                    }
                    for ($i = 0, $role_size = count($roles); $i < $role_size; $i++) {
                        $role = \Role::find($roles[$i]);

                        if ($role != null and count($role) > 0) {
                            $tmp = ['user_id' => $user_id,
                                'role_id' => $roles[$i],
                                'resource_id' => $resources[$j],
                                'resource_type' => $role->type,
                                'manager_id' => $managerId];
                            $results[] = \UserRoleMap::create($tmp);
                        } else {
                            $err = true;
                            break;
                        }
                    }
                }
                if ($err) {
                    for ($i = 0, $result_size = count($results); $i < $result_size; $i++) {
                        \UserRoleMap::destroy($results[$i]['id']);
                    }
                    return BaseController::response(array(
                        'msg' => 'visionone_add_user_role_error',
                        'method' => 'post',
                        'status' => \Config::get('constants.Internal_Server_Error')
                    ));
                }
            }
            return BaseController::response(array(
                'msg' => 'visionone_add_user_role_success',
                'method' => 'post',
                'data' => [],
                'status' => \Config::get('constants.Created')
            ));
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_add_user_role_error',
                'method' => 'post',
                'debug' => $ex->getMessage(),
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function getPermissionByUser($user_id, $resource_type, $resource_id) {
        try {
            $maps = \DB::table($resource_type)
                ->join('user_role_map', 'user_role_map.resource_id', '=', $resource_type . '.id')
                ->join('role', 'role.id', '=', 'user_role_map.role_id')
                ->where('user_role_map.user_id', '=', $user_id)
                ->where('user_role_map.resource_id', '=', $resource_id)
                ->selectRaw(\DB::raw(
                    'group_concat(role.name) as roleName,
                    group_concat(role.id) as roleIds, ' .
                    $resource_type . '.id as resource_id, ' .
                    $resource_type . '.name as resource_name,
                    role.type as type'
                ))
                ->groupBy($resource_type . '.id')
                ->get();
            if ($maps != null and count($maps) > 0) {
                return BaseController::response(array(
                    'msg' => 'visionone_get_user_role_success',
                    'method' => 'get',
                    'data' => $maps,
                    'status' => \Config::get('constants.OK')
                ));
            } else {
                return BaseController::response(array(
                    'msg' => 'visionone_get_user_role_success',
                    'method' => 'get',
                    'data' => [],
                    'status' => \Config::get('constants.OK')
                ));
            }
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_get_user_role_error',
                'method' => 'get',
                'data' => [],
                'debug' => $ex->getMessage(),
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function getAllPermissionByUser($user_id) {
        try {
            $resource_type = \Input::get('resource_type');
            if ($resource_type == 'content') {
                $maps = \DB::table('content')
                    ->join('user_role_map', 'user_role_map.resource_id', '=', 'content.id')
                    ->join('role', 'role.id', '=', 'user_role_map.role_id')
                    ->where('content.folder_type', '=', 'normal')
                    ->where('user_role_map.user_id', '=', $user_id)
                    ->where('role.type', '=', 'content')
                    ->selectRaw(\DB::raw(
                        'group_concat(role.name) as roleName,
                        group_concat(role.id) as roleIds,
                        content.id as resource_id,
                        content.name as resource_name,
                        role.type as type,
                        content.folder_type as folder_type'
                    ))
                    ->groupBy('content.id')
                    ->get();
            } else {
                $maps = \DB::table($resource_type)
                    ->join('user_role_map', 'user_role_map.resource_id', '=', $resource_type . '.id')
                    ->join('role', 'role.id', '=', 'user_role_map.role_id')
                    ->where('user_role_map.user_id', '=', $user_id)
                    ->where('role.type', '=', $resource_type)
                    ->selectRaw(\DB::raw(
                        'group_concat(role.name) as roleName,
                        group_concat(role.id) as roleIds, ' .
                        $resource_type . '.id as resource_id, ' .
                        $resource_type . '.name as resource_name,
                        role.type as type'
                    ))
                    ->groupBy($resource_type . '.id')
                    ->get();
            }
            if ($maps != null and count($maps) > 0) {
                return BaseController::response(array(
                    'msg' => 'visionone_get_user_role_success',
                    'method' => 'get',
                    'data' => $maps,
                    'status' => \Config::get('constants.OK')
                ));
            } else {
                return BaseController::response(array(
                    'msg' => 'visionone_get_user_role_success',
                    'method' => 'get',
                    'data' => [],
                    'status' => \Config::get('constants.OK')
                ));
            }
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_get_user_role_error',
                'method' => 'get',
                'data' => [],
                'debug' => $ex->getMessage(),
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function getLoginForm() {
        return app('Visionone\Services\Forms\LoginForm');
    }

    public function updateLicense($id)
    {
        try {
            $data = \Input::all();
            $license = \License::find($data['apply_license_id']);
            $subAdminLicense = \SubAdminLicense::where('manager_id', '=', $id)->first();

            if ($subAdminLicense != null and $license != null) {
                // update
                $expire_date = new \DateTime($subAdminLicense['expire_date']);
                $expire_date->modify("+" . $data['license_duration'] . " days");
                $subAdminLicense->expire_date = $expire_date;
                if ($subAdminLicense->license_id != $license->id) {
                    $subAdminLicense->license_data = json_encode(array(
                        'max_user' => $license->max_user,
                        'max_device' => $license->max_device,
                        'max_store_size' => $license->max_store_size,
                        'max_file_count' => $license->max_file_count));
                    $subAdminLicense->license_id = $license->id;
                }
                $subAdminLicense->save();
            } else {
                if ($license != null) {
                    // create
                    $newSubAdminLicense = array();
                    $newSubAdminLicense['manager_id'] = $id;
                    $newSubAdminLicense['license_id'] = $license->id;
                    $expire_date = new \DateTime();
                    $expire_date->modify("+" . $data['license_duration'] . " days");
                    $newSubAdminLicense['expire_date'] = $expire_date;
                    $newSubAdminLicense['license_data'] = json_encode(array(
                        'max_user' => $license->max_user,
                        'max_device' => $license->max_device,
                        'max_store_size' => $license->max_store_size,
                        'max_file_count' => $license->max_file_count));
                    $newSubAdminLicense['current_license_data'] = json_encode(array(
                        'curr_user' => 0,
                        'curr_device' => 0,
                        'curr_store_size' => 0,
                        'curr_file_count' => 0));

                    $result = \SubAdminLicense::create($newSubAdminLicense);
                } else {
                    return BaseController::response(array(
                        'msg' => 'visionone_edit_tenant_license_error',
                        'debug' => 'visionone_edit_tenant_license_error',
                        'method' => 'POST',
                        'status' => \Config::get('constants.Internal_Server_Error')
                    ));
                }
            }

            return BaseController::response(array(
                'msg' => 'visionone_edit_tenant_license_success',
                'data' => "",
                'method' => 'POST',
                'status' => \Config::get('constants.Created')
            ));
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_edit_tenant_license_error',
                'debug' => $ex->getMessage(),
                'method' => 'POST',
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }
}
