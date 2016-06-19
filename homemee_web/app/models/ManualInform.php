<?php

class ManualInform extends \Eloquent {
    protected $fillable = ['title','detail','state','created_by', 'apartment_id', 'published_at'];
    protected $table = 'manual_inform';
    protected $timestamp = true;
}