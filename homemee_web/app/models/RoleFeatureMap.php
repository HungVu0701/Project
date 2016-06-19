<?php

class RoleFeatureMap extends \Eloquent {
	protected $fillable = ['role_id','feature_id'];
	protected $table = 'role_feature_map';
	protected $timestamp = true;

    public static function getProjectId($idResource){
        return 0;
    }

    public static function getTenantId($idResource){
        return 0;
    }
}