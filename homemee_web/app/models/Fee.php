<?php

class Fee extends \Eloquent {
    protected $fillable = ['room_name','month',
        'manager_fee', 'bicycle_fee', 'auto_fee',
        'moto_fee', 'water_fee',
        'water_num_first', 'water_num_last', 'water_num_used', 'water_fee_unit',
        'state', 'created_by'
    ];
    protected $table = 'tbl_fee';
    protected $timestamp = true;
}