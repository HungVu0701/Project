<?php

namespace Visionone\Repositories\Eloquent;

use Visionone\Repositories\RoomRepositoryInterface;
use Controllers\BaseController;

class RoomRepository extends AbstractRepository implements RoomRepositoryInterface
{

    public function findAll()
    {
        try {
            $apartmentId = \Session::get('apartment_id', null);
            $rooms = null;
            if ($apartmentId != null) {
                $rooms = \Room::where('apartment_id', '=', $apartmentId)->get();
                $rooms = \DB::table('room')
                    ->where('room.apartment_id', '=', $apartmentId)
                    ->join('room_owner', 'room_owner.room_id', '=', 'room.id')
                    ->join('user', 'user.id', '=', 'room_owner.user_id')
                    ->where('room_owner.owner_type', '=', 'super')
                    ->get([
                        'room.name',
                        'room.code',
                        'room.area',
                        'room.state',
                        'user.email as owner',
                        'user.first_name',
                        'user.last_name'
                    ]);
            }

            if ($rooms != null and count($rooms) > 0) {
                return BaseController::response(array(
                    'msg' => 'visionone_get_room_success',
                    'data' => $rooms,
                    'method' => 'get',
                    'status' => \Config::get('constants.OK')
                ));
            } else {
                return BaseController::response(array(
                    'msg' => 'visionone_get_room_success',
                    'data' => [],
                    'method' => 'get',
                    'status' => \Config::get('constants.OK')
                ));
            }
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_get_room_error',
                'debug' => $ex->getMessage(),
                'method' => 'get',
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    public function findById($id) {

    }
}
