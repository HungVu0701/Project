<?php

class Apartment extends \Eloquent {
    protected $fillable = ['name','descriptions', 'address', 'code', 'created_by'];
    protected $table = 'apartment';
    protected $timestamp = true;
}