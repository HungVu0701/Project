<?php

class Configuration extends \Eloquent {
	protected $fillable = ['config_key','config_value'];
	protected $table = 'system_config';
	protected $timestamp = true;

    public static function getManagerId($idResource){
        return 0;
    }
}