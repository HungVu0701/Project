<?php

class Feature extends \Eloquent
{
    protected $fillable = ['name', 'description', 'signature_func'];
    protected $table = 'feature';
    protected $timestamp = true;

    public static function getProjectId($idResource){
        return 0;
    }

    public static function getTenantId($idResource){
        return 0;
    }
}