<?php

class License extends \Eloquent {
    protected $fillable = ['name','description','max_device','max_user',
        'max_store_size', 'max_file_count'];
    protected $table = 'license';
    protected $timestamp = true;

    public static function getProjectId($idResource){
        return 0;
    }

    public static function getTenantId($idResource){
        return 0;
    }
}