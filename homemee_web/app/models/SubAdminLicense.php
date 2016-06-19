<?php

class SubAdminLicense extends \Eloquent
{
    protected $fillable = ['manager_id', 'license_id', 'expire_date', 'created_at',
        'updated_at', 'license_data', 'current_license_data'];
    protected $table = 'subadmin_license';
    protected $timestamp = true;

    public static function getProjectId($idResource)
    {
        return 0;
    }

    public static function getTenantId($idResource)
    {
        return 0;
    }
}