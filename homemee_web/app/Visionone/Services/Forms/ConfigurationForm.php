<?php

namespace Visionone\Services\Forms;


class ConfigurationForm extends AbstractForm
{
    protected $rules = [
    ];

    protected $url_rules = [
        'download_interval' => 'numeric|min:1',
        'event_logger_interval' => 'numeric|min:30',
        'statistic_logger_fast_mode_interval' => 'numeric|min:30',
        'play_logger_interval' => 'numeric|min:30',
        'statistic_logger_low_mode_interval' => 'numeric|min:30',
    ];

    protected $messages = [
        'download_interval.numeric' => 'visionone_download_interval_not_numeric',
        'download_interval.min' => 'visionone_download_interval_min_30',

        'event_logger_interval.numeric' => 'visionone_event_logger_interval_not_numeric',
        'event_logger_interval.min' => 'visionone_event_logger_interval_min_30',

        'statistic_logger_fast_mode_interval.numeric' => 'visionone_statistic_logger_fast_mode_interval_not_numeric',
        'statistic_logger_fast_mode_interval.min' => 'visionone_statistic_logger_fast_mode_interval_min_30',

        'play_logger_interval.numeric' => 'visionone_play_logger_interval_not_numeric',
        'play_logger_interval.min' => 'visionone_play_logger_interval_min_30',

        'statistic_logger_low_mode_interval.numeric' => 'visionone_statistic_logger_low_mode_interval_not_numeric',
        'statistic_logger_low_mode_interval.min' => 'visionone_statistic_logger_low_mode_interval_min_30',
    ];
}
