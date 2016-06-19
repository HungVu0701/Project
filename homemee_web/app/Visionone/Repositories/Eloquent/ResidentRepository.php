<?php

namespace Visionone\Repositories\Eloquent;

use Visionone\Repositories\ResidentRepositoryInterface;
use Controllers\BaseController;

class ResidentRepository extends AbstractRepository implements ResidentRepositoryInterface
{

    public function findAll()
    {
        try {
            $user = app('user');
            if ($user->type == 'apartment_member') {
                return BaseController::response(array(
                    'msg' => 'visionone_get_resident_success',
                    'data' => \User::where('type', '=', 'resident')->get(),
                    'method' => 'get',
                    'status' => \Config::get('constants.OK')
                ));
            } else if ($user->type == 'apartment_manager') {
                return BaseController::response(array(
                    'msg' => 'visionone_get_resident_success',
                    'data' => \User::whereIn('type', ['resident', 'apartment_member'])->get(),
                    'method' => 'get',
                    'status' => \Config::get('constants.OK')
                ));
            } else {
                return BaseController::response(array(
                    'msg' => 'visionone_get_resident_error',
                    'method' => 'get',
                    'status' => \Config::get('constants.Forbidden')
                ));
            }
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_get_resident_error',
                'debug' => $ex->getMessage(),
                'method' => 'get',
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function findById($id) {

    }
}
