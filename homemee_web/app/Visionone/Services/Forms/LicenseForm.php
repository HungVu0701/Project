<?php
namespace Visionone\Services\Forms;

class LicenseForm extends AbstractForm
{
    protected $rules = [
        'name' => 'max:100|unique:license,name',
        'max_device' => 'max:100000|min:1',
        'max_file_count' => 'max:100000|min:1',
        'max_store_size' => 'max:100000|min:1',
        'max_user' => 'max:100000|min:1',

    ];

    protected $url_rules = [
        'id' => 'numeric|required|exists:license,id'
    ];

    protected $rules_update = [
        'id'  => 'required|exists:license,id',
        'name' => 'max:100|unique:license,name',
    ];

    protected $messages = [
        'name.max' => 'visionone_license_name_reach_max_length_100',
        'name.unique' => 'visionone_license_name_not_unique',
        'id.numeric' => 'visionone_license_id_not_numeric',
        'id.required' => 'visionone_license_id_required',
        'id.exists' => 'visionone_license_id_not_exists',

        'max_device.min' => 'visionone_max_device_1',
        'max_device.max' => 'visionone_max_device_100000',

        'max_file_count.min' => 'visionone_max_file_count_1',
        'max_file_count.max' => 'visionone_max_file_count_100000',

        'max_store_size.min' => 'visionone_max_store_size_1',
        'max_store_size.max' => 'visionone_max_store_size_100000',

        'max_user.min' => 'visionone_max_user_1',
        'max_user.max' => 'visionone_max_user_100000',
    ];
}
