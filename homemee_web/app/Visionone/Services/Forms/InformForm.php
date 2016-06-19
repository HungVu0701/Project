<?php
namespace Visionone\Services\Forms;

class InformForm extends AbstractForm
{
    protected $rules = [
        'title' => 'max:100',
        'detail' => 'max:1000',
    ];

    protected $url_rules = [
        'id' => 'numeric|required|exists:tbl_inform,id'
    ];

    protected $rules_update = [
        'id'  => 'required|exists:tbl_inform,id',
        'title' => 'max:100',
        'detail' => 'max:1000',
    ];

    protected $messages = [
        'title.max' => 'visionone_inform_title_reach_max_length_100',
        'detail.max' => 'visionone_inform_detail_reach_max_length_1000',
        'id.numeric' => 'visionone_inform_id_not_numeric',
        'id.required' => 'visionone_inform_id_required',
        'id.exists' => 'visionone_inform_id_not_exists',
    ];
}
