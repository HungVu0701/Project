<?php

namespace Visionone\Repositories\Eloquent;

use Visionone\Repositories\InformRepositoryInterface;
use Controllers\BaseController;

class InformRepository extends AbstractRepository implements InformRepositoryInterface
{

    public function findAll()
    {
        try {
            $user = app('user');
            $informs = null;
            if ($user->type == 'apartment_manager') {
                $informs = \DB::table('tbl_inform')
                    ->orderBy('created_at','DESC')
                    ->get();
            } else if ($user == 'apartment_member') {
                $informs = \DB::table('tbl_inform')
                    ->where('created_by', '=', $user->id)
                    ->get();
            }

            if ($informs != null and count($informs) > 0) {
                return BaseController::response(array(
                    'msg' => 'visionone_get_inform_success',
                    'data' => $informs,
                    'method' => 'get',
                    'status' => \Config::get('constants.OK')
                ));
            } else {
                return BaseController::response(array(
                    'msg' => 'visionone_get_inform_success',
                    'data' => [],
                    'method' => 'get',
                    'status' => \Config::get('constants.OK')
                ));
            }
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_get_inform_error',
                'debug' => $ex->getMessage(),
                'method' => 'get',
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function findAllPublishByPhoneNumber($phoneNumber) {

    }

    public function create(array $data)
    {
        try {
            $user = app('user');

            $data['created_by'] = $user->id;
            if ($data['available'] == null or $data['available'] == '') {
                $data['available'] = date("Y-m-d H:i:s", time() + 10*\Config::get('visionone.session_expired_time'));
            } else {
                $data['available'] = date("Y-m-d H:i:s", strtotime($data['available']));
            }
            return BaseController::response(array(
                'msg' => 'visionone_create_inform_success',
                'data' => \Inform::create($data),
                'method' => 'post',
                'status' => \Config::get('constants.Created')
            ));
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_create_inform_error',
                'debug' => $ex->getMessage(),
                'method' => 'post',
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function delete($id)
    {
        try {
            $user = app('user');
            if ($user->type == 'apartment_manager') {
                $inform = \Inform::where('id', '=', $id)->first();
            } else if ($user->type == 'apartment_member') {
                $inform = \Inform::where('id', '=', $id)
                    ->where('created_by', '=', $user->id)
                    ->first();
            }

            if ($inform != null) {
                return BaseController::response(array(
                    'msg' => 'visionone_delete_inform_success',
                    'data' => $inform->delete(),
                    'method' => 'post',
                    'status' => \Config::get('constants.OK')
                ));
            } else {
                return BaseController::response(array(
                    'msg' => 'visionone_delete_inform_error_not_found',
                    'method' => 'post',
                    'status' => \Config::get('constants.Not_Found')
                ));
            }
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_delete_inform_error',
                'debug' => $ex->getMessage(),
                'method' => 'post',
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function publish($id)
    {
        try {
            $user = app('user');
            $inform = null;
            if ($user->type == 'apartment_manager') {
                $inform = \Inform::where('id', '=', $id)->first();
            } else if ($user->type == 'apartment_member') {
                $inform = \Inform::where('id', '=', $id)
                    ->where('created_by', '=', $user->id)
                    ->first();
            }

            if ($inform == null) {
                return BaseController::response(array(
                    'msg' => 'visionone_delete_inform_error_not_found',
                    'method' => 'post',
                    'status' => \Config::get('constants.Not_Found')
                ));
            } else {
                if ($inform->state == 'publish') {
                    return BaseController::response(array(
                        'msg' => 'visionone_inform_ready_publish',
                        'method' => 'post',
                        'status' => \Config::get('constants.OK')
                    ));
                } else {
                    $inform->state = 'publish';
//                    $inform->published_at = new \DateTime();
                    $inform->save();

                    // create sms
                    $users = \User::where('type', '=', 'resident')->get();
                    if ($users != null and count($users) > 0) {
                        for ($i = count($users) - 1; $i >= 0; $i--) {
                            $sms['phone'] = $users[$i]->email;
                            $sms['content'] = $inform->sms_content;
                            \SmsQueue::create($sms);
                        }
                    }

                    return BaseController::response(array(
                        'msg' => 'visionone_publish_inform_success',
                        'data' => [],
                        'method' => 'post',
                        'status' => \Config::get('constants.OK')
                    ));
                }

            }
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_delete_inform_error',
                'debug' => $ex->getMessage(),
                'method' => 'post',
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function update($id, array $data)
    {
        try {
            $user = app('user');
            unset($data['id']);
            $data['available'] = date("Y-m-d H:i:s", strtotime($data['available']));

            if ($user->type == 'apartment_manager') {
                $inform = \Inform::where('id', '=', $id)->first();
            } else if ($user->type == 'apartment_member') {
                $inform = \Inform::where('id', '=', $id)
                    ->where('created_by', '=', $user->id)
                    ->first();
            }

            if ($inform == null) {
                return BaseController::response(array(
                    'msg' => 'visionone_update_inform_error_not_found',
                    'method' => 'post',
                    'status' => \Config::get('constants.Not_Found')
                ));
            } else {
                $inform->update($data);
                return BaseController::response(array(
                    'msg' => 'visionone_update_inform_success',
                    'data' => \Inform::find($id),
                    'method' => 'post',
                    'status' => \Config::get('constants.Created')
                ));
            }
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_create_inform_error',
                'debug' => $ex->getMessage(),
                'method' => 'get',
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function getInformForm()
    {
        return app('Visionone\Services\Forms\InformForm');
    }

    public function getInformApi($residentId) {
        try {
            $user = app('user');
            if ($user->id == $residentId) {
                $page = (int)\Input::get('page');
                if ($page <=0) {
                    $page = 1;
                }
                $maxRowOnPage = \Config::get('visionone.max_row_on_page');
                $totalRow = \DB::table('tbl_inform')
                    ->where('tbl_inform.state', '=', 'publish')
                    ->count();
                $informs = \DB::table('tbl_inform')
                    ->where('tbl_inform.state', '=', 'publish')
                    ->orderBy('created_at', 'desc')
                    ->limit($maxRowOnPage*$page)
                    ->get();
                return BaseController::response(array(
                    'msg' => 'visionone_get_inform_success',
                    'data' => $informs,
                    'current_page' => $page,
                    'total_row' => $totalRow,
                    'maxRowOnPage' => $maxRowOnPage,
                    'method' => 'get',
                    'status' => \Config::get('constants.OK')
                ));
            } else {
                return BaseController::response(array(
                    'msg' => 'visionone_get_inform_error',
                    'method' => 'get',
                    'status' => \Config::get('constants.Bad_Request')
                ));
            }
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_get_inform_error',
                'debug' => $ex->getMessage(),
                'method' => 'get',
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }
}
