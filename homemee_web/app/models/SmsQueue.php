<?php

class SmsQueue extends \Eloquent {
    protected $fillable = ['phone','content','status'];
    protected $table = 'tbl_sms_queue';
    protected $timestamp = true;
}