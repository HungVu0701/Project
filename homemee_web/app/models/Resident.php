<?php

class Resident extends \Eloquent {
    protected $fillable = ['apartment_id','apartment_code', 'user_id', 'user_code', 'created_by'];
    protected $table = 'resident';
    protected $timestamp = true;
}