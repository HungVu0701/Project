<?php

class ApartmentManager extends \Eloquent {
    protected $fillable = ['manager_id','apartment_id', 'created_by'];
    protected $table = 'apartment_manager';
    protected $timestamp = true;
}