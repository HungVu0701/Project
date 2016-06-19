<?php

namespace Visionone\Repositories\Eloquent;

use Visionone\Repositories\FeeRepositoryInterface;
use Controllers\BaseController;

class FeeRepository extends AbstractRepository implements FeeRepositoryInterface
{
    public function findAll($month)
    {
        try {
            $user = app('user');
            $fees = array();
            if ($user->type == 'apartment_manager' or $user->type == 'apartment_user') {
                $fees = \DB::table('tbl_fee')
                    ->where('month', '=', $month)->get();
                return BaseController::response(array(
                    'msg' => 'visionone_get_fee_success',
                    'data' => $fees,
                    'method' => 'get',
                    'status' => \Config::get('constants.OK')
                ));
            } else {
                return BaseController::response(array(
                    'msg' => 'visionone_get_fee_error',
                    'data' => [],
                    'method' => 'get',
                    'status' => \Config::get('constants.Bad_Request')
                ));
            }
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_get_charge_error',
                'debug' => $ex->getMessage(),
                'method' => 'get',
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function findApi($residentId, $year)
    {
        try {
            $user = app('user');
            if ($user->id == $residentId) {
                $fees = \DB::table('user')
                    ->where('user.id', '=', $residentId)
                    ->join('tbl_fee', 'user.room_name', '=', 'tbl_fee.room_name')
                    ->where('tbl_fee.month', 'like', '' . $year . '%')
                    ->get([
//                        'tbl_fee.id',
                        'tbl_fee.room_name',
                        'tbl_fee.month',
                        'tbl_fee.manager_fee',
                        'tbl_fee.bicycle_fee',
                        'tbl_fee.auto_fee',
                        'tbl_fee.moto_fee',
                        'tbl_fee.water_fee',
                        'tbl_fee.water_num_first',
                        'tbl_fee.water_num_last',
                        'tbl_fee.water_num_used',
                        'tbl_fee.water_fee_unit',
                        'tbl_fee.state',
                        'tbl_fee.created_by',
                        'tbl_fee.created_at',
                        'tbl_fee.updated_at'
                    ]);
                return BaseController::response(array(
                    'msg' => 'visionone_get_fee_success',
                    'method' => 'get',
                    'data' => $fees,
                    'status' => \Config::get('constants.OK')
                ));
            } else {
                return BaseController::response(array(
                    'msg' => 'visionone_get_fee_error',
                    'method' => 'get',
                    'data' => [],
                    'status' => \Config::get('constants.Bad_Request')
                ));
            }
        } catch (\Exception $ex) {
            \Log::error($ex->getMessage());
            return BaseController::response(array(
                'msg' => 'visionone_get_fee_error',
                'method' => 'get',
                'debug' => $ex->getMessage(),
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function sendSms($feeId)
    {
        try {
            $user = app('user');
            $feeSms = array();

            if ($user->type == 'apartment_manager' or $user->type == 'apartment_member') {
                $fee = \DB::table('tbl_fee')
                    ->where('tbl_fee.id', '=', $feeId)
                    ->join('user', 'tbl_fee.room_name', '=', 'user.room_name')
                    ->get(['email',
                        'month',
                        'manager_fee',
                        'bicycle_fee',
                        'auto_fee',
                        'moto_fee',
                        'water_fee',
                        'water_num_first',
                        'water_num_last',
                        'water_num_used',
                        'water_fee_unit'
                    ]);
                $feeSms['phone'] = $fee[0]->email;
                $feeSms['content'] = 'Thong bao phi ' . $fee[0]->month . ': '
                    . 'dich vu=' . $fee[0]->manager_fee . ', '
                    . 'xe dap=' . $fee[0]->bicycle_fee . ', '
                    . 'oto=' . $fee[0]->auto_fee . ', '
                    . 'xe may=' . $fee[0]->moto_fee . ', '
                    . 'nuoc=' . $fee[0]->water_fee . ', '
                    . 'so dau=' . $fee[0]->water_num_first . ', '
                    . 'so cuoi=' . $fee[0]->water_num_last . ', '
                    . 'so da dung=' . $fee[0]->water_num_used . ', '
                    . 'don gia=' . $fee[0]->water_fee_unit . '.';

                return BaseController::response(array(
                    'msg' => 'visionone_create_fee_sms_success',
                    'data' => \SmsQueue::create($feeSms),
                    'method' => 'post',
                    'status' => \Config::get('constants.Created')
                ));
            } else {
                return BaseController::response(array(
                    'msg' => 'visionone_send_fee_sms_error',
                    'method' => 'post',
                    'status' => \Config::get('constants.Forbidden')
                ));
            }
        } catch (\Exception $ex) {
            return BaseController::response(array(
                'msg' => 'visionone_send_fee_sms_error',
                'method' => 'post',
                'debug' => $ex->getMessage(),
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function publish($feeId)
    {
        try {
            $user = app('user');
            $feeSms = array();

            if ($user->type == 'apartment_manager' or $user->type == 'apartment_member') {
                $fee = \Fee::find($feeId);
                $fee->state = 'publish';
                return BaseController::response(array(
                    'msg' => 'visionone_publish_fee_success',
                    'data' => $fee->save(),
                    'method' => 'post',
                    'status' => \Config::get('constants.Created')
                ));
            } else {
                return BaseController::response(array(
                    'msg' => 'visionone_send_fee_sms_error',
                    'method' => 'post',
                    'status' => \Config::get('constants.Forbidden')
                ));
            }
        } catch (\Exception $ex) {
            return BaseController::response(array(
                'msg' => 'visionone_send_fee_sms_error',
                'method' => 'post',
                'debug' => $ex->getMessage(),
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function getFeeForm()
    {
        return app('Visionone\Services\Forms\FeeForm');
    }

    public function uploadListFee($device_list)
    {
        try {
            // $user = app('userLogined');
            $size_of_list = count($device_list);
            if ($size_of_list > 0) {
                //xoa record co thang = month - stupid code
                $month1 = $device_list[1]['month'];
                \DB::table('tbl_fee')->where('tbl_fee.month', '=', $month1)->delete();

                for ($i = 1; $i < $size_of_list; $i++) {
                    $data = $device_list[$i];
//
//                $data['create_by'] = $user['id'];
//                $data['tenant_id'] = $user['tenant_id'];
                    \Fee::create($data);
                }
                return BaseController::response(array(
                    'msg' => 'visionone_upload_device_list_success',
                    'data' => '',
                    'method' => 'POST',
                    'status' => \Config::get('constants.Created')));
            } else {
                return BaseController::response(array(
                    'msg' => 'visionone_upload_device_list_success',
                    'data' => 'ko co du lieu',
                    'method' => 'POST',
                    'status' => \Config::get('constants.Created')));
            }
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_upload_device_list_error',
                'debug' => $ex->getMessage(),
                'method' => 'post',
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }
}
