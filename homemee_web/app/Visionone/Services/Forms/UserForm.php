<?php
namespace Visionone\Services\Forms;

class UserForm extends AbstractForm {

    protected $rules = [
        'email' => 'required|max:100|unique:user,email|email',
        'first_name' => 'required|max:255',
        'last_name' => 'required|max:255'
    ];

    protected $rules_update = [
        'first_name' => 'max:255',
        'last_name' => 'max:255',
    ];

    protected $url_rules = [
        'id' => 'required|integer|exists:user,id',
    ];

    protected $messages = [
        'email.required' => 'visionone_email_required',
        'email.max' => 'visionone_email_reach_max_length_100',
        'email.unique' => 'visionone_email_not_unique',
        'first_name.required' => 'visionone_first_name_required',
        'first_name.max' => 'visionone_first_name_reach_max_length_255',
        'last_name.required' => 'visionone_last_name_required',
        'last_name.max' => 'visionone_last_name_reach_max_length_255',
        'id.required' => 'visionone_user_id_required',
        'id.integer' => 'visionone_user_id_not_integer',
        'id.exists' => 'visionone_user_id_not_exists',
        'email.email' => 'visionone_email_not_validated'
    ];
}
