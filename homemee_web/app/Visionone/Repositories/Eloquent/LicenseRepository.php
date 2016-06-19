<?php

namespace Visionone\Repositories\Eloquent;

use Visionone\Repositories\LicenseRepositoryInterface;
use Controllers\BaseController;

class LicenseRepository extends AbstractRepository implements LicenseRepositoryInterface
{

    public function findAll()
    {
        try {
            $licenses = \License::all();
            if ($licenses != null and count($licenses) > 0) {
                return BaseController::response(array(
                    'msg' => 'visionone_get_license_success',
                    'data' => $licenses,
                    'method' => 'get',
                    'status' => \Config::get('constants.OK')
                ));
            } else {
                return BaseController::response(array(
                    'msg' => 'visionone_get_license_success',
                    'data' => [],
                    'method' => 'get',
                    'status' => \Config::get('constants.OK')
                ));
            }
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_get_license_error',
                'debug' => $ex->getMessage(),
                'method' => 'get',
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function findById($id)
    {
        try {
            $license = \License::find($id);
            if ($license != null and count($license)) {
                return BaseController::response(array(
                    'msg' => 'visionone_get_license_success',
                    'data' => $license,
                    'method' => 'get',
                    'status' => \Config::get('constants.OK')
                ));
            } else {
                return BaseController::response(array(
                    'msg' => 'visionone_get_license_error_not_found',
                    'method' => 'get',
                    'status' => \Config::get('constants.Not_Found')
                ));
            }
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_get_license_error',
                'debug' => $ex->getMessage(),
                'method' => 'get',
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function findTenantUsingById($id)
    {
        try {
            $tenants = \DB::table('subadmin_license')
                ->join('user', 'user.id', '=', 'subadmin_license.manager_id')
                ->where('subadmin_license.license_id', '=', $id)
                ->orderBy('subadmin_license.expire_date', 'ASC')
                ->selectRaw(\DB::raw('
                    user.id as id,
                    user.email as name,
                    subadmin_license.expire_date as expire_date,
                    subadmin_license.license_data as license_data,
                    subadmin_license.current_license_data as current_license_data'))
                ->get();
            return BaseController::response(array(
                'msg' => 'visionone_get_user_using_success',
                'data' => $tenants,
                'method' => 'get',
                'status' => \Config::get('constants.Created')
            ));
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_get_user_using_error',
                'debug' => $ex->getMessage(),
                'method' => 'get',
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function create(array $data)
    {
        try {
            return BaseController::response(array(
                'msg' => 'visionone_create_license_success',
                'data' => \License::create($data),
                'method' => 'get',
                'status' => \Config::get('constants.Created')
            ));
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_create_license_error',
                'debug' => $ex->getMessage(),
                'method' => 'get',
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function delete($id)
    {
        try {
            return BaseController::response(array(
                'msg' => 'visionone_delete_license_success',
                'data' => \License::destroy($id),
                'method' => 'get',
                'status' => \Config::get('constants.OK')
            ));
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_delete_license_error',
                'debug' => $ex->getMessage(),
                'method' => 'get',
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function getLicenseForm()
    {
        return app('Visionone\Services\Forms\LicenseForm');
    }
}
