<?php

class UserRoleMap extends \Eloquent {
	protected $fillable = ['manager_id','user_id','role_id', 'resource_id', 'manager_id', 'resource_type'];
	protected $table = 'user_role_map';
	protected $timestamp = true;

    public static function getManagerId($idResource){
        $tmp = UserRoleMap::find($idResource);
        return $tmp['manager_id'];
    }
}