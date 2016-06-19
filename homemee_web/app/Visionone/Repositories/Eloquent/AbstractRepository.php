<?php

namespace Visionone\Repositories\Eloquent;

abstract class AbstractRepository {
    public static function getNotFound () {
        return ['data'=>null, 'status'=>404];
    }

    public function __construct() {

    }

    public static function addRole($roleType, $resourceId, $managerId, $userId, $userType) {
        $roles = \Role::where('scope', '!=', 0)
            ->where('type', '=', $roleType)->get();
        if ($resourceId != null and $roles != null and count($roles) > 0) {
            for ($i = 0, $len = count($roles); $i < $len; $i++) {
                if($userType == 'User') {
                    \UserRoleMap::create(array('user_id' => $userId, 'resource_id' => $resourceId,
                        'role_id' => $roles[$i]['id'], 'resource_type' => $roleType, 'manager_id' => $managerId));
                }
                \UserRoleMap::create(array('user_id' => $managerId, 'resource_id' => $resourceId,
                    'role_id' => $roles[$i]['id'], 'resource_type' => $roleType, 'manager_id' => $managerId));
            }
        }
    }
}
