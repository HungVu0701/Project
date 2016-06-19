<?php

class Inform extends \Eloquent {
    protected $fillable = ['sms_content','title','content','state',
        'uri_content', 'created_by', 'type', 'available'];
    protected $table = 'tbl_inform';
    protected $timestamp = true;
}