<?php

class RoomOwner extends \Eloquent {
    protected $fillable = ['user_id','user_code', 'room_id', 'room_code',
        'owner_type', 'created_by'];
    protected $table = 'room_owner';
    protected $timestamp = true;
}