<?php

class Room extends \Eloquent {
    protected $fillable = ['name','code', 'owner_id', 'owner_code',
        'technical_drawing', 'created_by', 'area', 'apartment_id'];
    protected $table = 'room';
    protected $timestamp = true;
}