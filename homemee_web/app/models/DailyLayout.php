<?php

class DailyLayout extends \Eloquent {
    protected $fillable = array('_date','campaign_id','json','manager_id');
	protected $table = 'daily_layout';
	protected $timestamp = true;

    public function campaign(){
        return $this->belongsTo('Campaign','campaign_id');
    }

    public static function getManagerId($idResource){
        $tmp = DailyLayout::find($idResource);
        return $tmp['manager_id'];
    }
}