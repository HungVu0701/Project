<?php

class Role extends \Eloquent {
	protected $fillable = ['name','description','create_by'];
	protected $table = 'role';
	protected $timestamp = true;

    public function features(){
        return $this->hasMany('Feature','feature_id');
    }


    public static function getProjectId($idResource){
        return 0;
    }

    public static function getTenantId($idResource){
        return 0;
    }
}