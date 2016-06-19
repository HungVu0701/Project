<?php

namespace Visionone\Repositories\Eloquent;

use Visionone\Repositories\ConfigurationRepositoryInterface;
use Controllers\BaseController;
use Visionone\Services\Forms\ConfigurationForm;

class ConfigurationRepository extends AbstractRepository implements ConfigurationRepositoryInterface {
    function __construct() {

    }

    function findAll() {
        try {
            $configuration = \Configuration::all();
            if ($configuration != null and count($configuration) > 0) {
                return BaseController::response(array(
                    'msg' => 'visionone_get_configuration_success',
                    'data' => $configuration,
                    'method' => 'get',
                    'status' => \Config::get('constants.OK')
                ));
            } else {
                return BaseController::response(array(
                    'msg' => 'visionone_get_configuration_success',
                    'data' => [],
                    'method' => 'get',
                    'status' => \Config::get('constants.OK')
                ));
            }
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_get_configuration_error',
                'method' => 'get',
                'debug' => $ex->getMessage(),
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    function save() {
            $form = new ConfigurationForm();
            if(!$form->isUpdateValid()) {
                return BaseController::response(array(
                    'msg' => 'visionone_create_configuration_error',
                    'method' => 'post',
                    'debug' => $form->getErrors(),
                    'status' => \Config::get('constants.Bad_Request')
                ));
            }

            // Check file validate
            $vertical_screen_saver = \Input::file('fileToUpload1');
            $horizontal_screen_saver = \Input::file('fileToUpload2');
            $default_content = \Input::file('fileToUpload3');

            $uploadFolder = \Config::get('visionone.uploads_folder');
            $uploadThumbFolder = \Config::get('visionone.thumbnail_folder');

            // file upload are stored
            $vertical_screen_saver_name = null;
            $vertical_screen_saver_name_extension = null;
            $vertical_screen_saver_folder = "aa";
            $vertical_screen_saver_thumb_name = null;

            $horizontal_screen_saver_name = null;
            $horizontal_screen_saver_folder = "aa";
            $horizontal_screen_saver__thumb_name = null;

            $default_content_thumb_name = null;
            $default_content_folder = "aa";
            $default_content_name = null;

            try {
                $horizontal_screen_saver_name_extension = null;
                $horizontal_screen_saver_thumb_name = null;
                $default_content_name_extension = null;

                // upload vertical content
                if ($vertical_screen_saver != null) {
                    try {
                        $fileHash = sha1_file($_FILES['fileToUpload1']['tmp_name']);
                        if ($fileHash != null) {
                            $vertical_screen_saver_name = substr($fileHash, 2);
                            $vertical_screen_saver_folder = substr($fileHash, 0, 2) . '/';
                        }

                        $destinationSavedPath = $uploadFolder . $vertical_screen_saver_folder;
                        $fullUploadPath = $destinationSavedPath . '/';
                        $fullUploadThumbPath = public_path() . $uploadThumbFolder . $vertical_screen_saver_folder . '/';
                        // create thumb folder if not exist
                        if (!file_exists($fullUploadThumbPath)) {
                            mkdir($fullUploadThumbPath, 0777, true);
                        }

                        $extension = \File::extension($vertical_screen_saver->getClientOriginalName());
                        $validate_extensions = ['jpg', 'jpeg', 'png'];
                        if (!in_array($extension, $validate_extensions)) {
                            return BaseController::response(array(
                                'msg' => 'visionone_upload_file_error',
                                'method' => 'post',
                                'debug' => 'invalid vertical file',
                                'status' => \Config::get('constants.Internal_Server_Error')
                            ));
                        } else {
                            $vertical_screen_saver_name_extension = '' . $vertical_screen_saver_name . '.' . $extension;
                            \Input::file('fileToUpload1')->move($destinationSavedPath, $vertical_screen_saver_name_extension);
                            $vertical_screen_saver_thumb_name = BaseController::genThumbnail(
                                $fullUploadPath, $vertical_screen_saver_name, $extension, $fullUploadThumbPath);
                        }
                    } catch (\Exception $ex) {
                        \Log::error($ex);
                        return BaseController::response(array(
                            'msg' => 'visionone_upload_file_error',
                            'method' => 'post',
                            'debug' => $ex->getMessage(),
                            'status' => \Config::get('constants.Internal_Server_Error')
                        ));
                    }
                }

                // upload horizontal content
                if ($horizontal_screen_saver != null) {
                    try {
                        $fileHash = sha1_file($_FILES['fileToUpload2']['tmp_name']);
                        if ($fileHash != null) {
                            $horizontal_screen_saver_name = substr($fileHash, 2);
                            $horizontal_screen_saver_folder = substr($fileHash, 0, 2) . '/';
                        }

                        $destinationSavedPath = $uploadFolder . $horizontal_screen_saver_folder;
                        $fullUploadPath = $destinationSavedPath . '/';
                        $fullUploadThumbPath = public_path() . $uploadThumbFolder . $horizontal_screen_saver_folder . '/';
                        if (!file_exists($fullUploadThumbPath)) {
                            mkdir($fullUploadThumbPath, 0777, true);
                        }

                        $extension = \File::extension($horizontal_screen_saver->getClientOriginalName());
                        $validate_extensions = ['jpg', 'jpeg', 'png'];
                        if (!in_array($extension, $validate_extensions)) {
                            return BaseController::response(array(
                                'msg' => 'visionone_upload_file_error',
                                'method' => 'post',
                                'debug' => 'invalid horizontal file',
                                'status' => \Config::get('constants.Internal_Server_Error')
                            ));
                        }
                        $horizontal_screen_saver_name_extension = '' . $horizontal_screen_saver_name . '.' . $extension;
                        \Input::file('fileToUpload2')->move($destinationSavedPath, $horizontal_screen_saver_name_extension);
                        $horizontal_screen_saver_thumb_name = BaseController::genThumbnail(
                            $fullUploadPath, $horizontal_screen_saver_name, $extension, $fullUploadThumbPath);
                    } catch (\Exception $ex) {
                        \Log::error($ex);
                        return BaseController::response(array(
                            'msg' => 'visionone_upload_file_error',
                            'method' => 'post',
                            'debug' => $ex->getMessage(),
                            'status' => \Config::get('constants.Internal_Server_Error')
                        ));
                    }
                }

                // upload default content
                if ($default_content != null) {
                    try {
                        $fileHash = sha1_file($_FILES['fileToUpload3']['tmp_name']);
                        if ($fileHash != null) {
                            $default_content_name = substr($fileHash, 2);
                            $default_content_folder = substr($fileHash, 0, 2) . '/';
                        }

                        $destinationSavedPath = $uploadFolder . $default_content_folder;
                        $fullUploadPath = $destinationSavedPath . '/';
                        $fullUploadThumbPath = public_path() . $uploadThumbFolder . $default_content_folder . '/';
                        if (!file_exists($fullUploadThumbPath)) {
                            mkdir($fullUploadThumbPath, 0777, true);
                        }

                        $extension = \File::extension($default_content->getClientOriginalName());
                        $validate_extensions = ['jpg', 'jpeg', 'png'];
                        if (!in_array($extension, $validate_extensions)) {
                            return BaseController::response(array(
                                'msg' => 'visionone_upload_file_error',
                                'method' => 'post',
                                'debug' => 'invalid default file',
                                'status' => \Config::get('constants.Internal_Server_Error')
                            ));
                        }
                        $default_content_name_extension = '' . $default_content_name . '.' . $extension;
                        \Input::file('fileToUpload3')->move($destinationSavedPath, $default_content_name_extension);
                        $default_content_thumb_name = BaseController::genThumbnail(
                            $fullUploadPath, $default_content_name, $extension, $fullUploadThumbPath);
                    } catch (\Exception $ex) {
                        \Log::error($ex);
                        return BaseController::response(array(
                            'msg' => 'visionone_upload_file_error',
                            'method' => 'post',
                            'debug' => $ex->getMessage(),
                            'status' => \Config::get('constants.Internal_Server_Error')
                        ));
                    }
                }

            $input = [];

            if ($vertical_screen_saver_name_extension != null && $vertical_screen_saver_thumb_name != null) {
                $screen_url = array(
                    "uri" => '/' . $vertical_screen_saver_folder . $vertical_screen_saver_name_extension,
                    "thumb_uri" => $uploadThumbFolder . $vertical_screen_saver_folder . $vertical_screen_saver_thumb_name,
                    "size" => $vertical_screen_saver->getClientSize(),
                    "org_name" => $vertical_screen_saver->getClientOriginalName(),
                    "last_modified" => \Config::get('visionone.static_modify'));
                $input[] = ['config_key' => 'vertical_screen_url', 'config_value' => json_encode($screen_url)];
            }

            if ($horizontal_screen_saver_name_extension != null && $horizontal_screen_saver_thumb_name != null) {
                $logo_url = array(
                    "uri" => '/' . $horizontal_screen_saver_folder . $horizontal_screen_saver_name_extension,
                    "thumb_uri" => $uploadThumbFolder . $horizontal_screen_saver_folder . $horizontal_screen_saver_thumb_name,
                    "size" => $horizontal_screen_saver->getClientSize(),
                    "org_name" => $horizontal_screen_saver->getClientOriginalName(),
                    "last_modified" => \Config::get('visionone.static_modify'));
                $input[] = ['config_key' => 'horizontal_screen_url', 'config_value' => json_encode($logo_url)];
            }

            if ($default_content_name_extension != null && $default_content_thumb_name != null) {
                $err_playing_url = array(
                    "uri" => '/' . $default_content_folder . $default_content_name_extension,
                    "thumb_uri" => $uploadThumbFolder . $default_content_folder . $default_content_thumb_name,
                    "size" => $default_content->getClientSize(),
                    "org_name" => $default_content->getClientOriginalName(),
                    "last_modified" => \Config::get('visionone.static_modify'));
                $input[] = ['config_key' => 'default_content_url', 'config_value' => json_encode($err_playing_url)];
            }

            if (\Input::get('download_time')) {
                $input[] = ['config_key' => 'download_time', 'config_value' => \Input::get('download_time')];
                if(!$this->validateTime(\Input::get('download_time'))) {
                    return BaseController::response(array(
                        'msg' => 'visionone_save_configuration_error_download_time_invalid',
                        'method' => 'post',
                        'status' => \Config::get('constants.Bad_Request')
                    ));
                }
            }

            if (\Input::get('download_interval') and (int)\Input::get('download_interval') > 0) {
                $input[] = ['config_key' => 'download_interval', 'config_value' => (int)\Input::get('download_interval')];
            }

            if (\Input::get('reboot_time')) {
                $input[] = ['config_key' => 'reboot_time', 'config_value' => \Input::get('reboot_time')];
                if(!$this->validateTime(\Input::get('reboot_time'))) {
                    return BaseController::response(array(
                        'msg' => 'visionone_save_configuration_error_reboot_time_invalid',
                        'method' => 'post',
                        'status' => \Config::get('constants.Bad_Request')
                    ));
                }
            }

            if (\Input::get('event_logger_interval')) {
                $input[] = ['config_key' => 'event_logger_interval', 'config_value' => \Input::get('event_logger_interval')];
            }

            if (\Input::get('play_logger_interval')) {
                $input[] = ['config_key' => 'play_logger_interval', 'config_value' => \Input::get('play_logger_interval')];
            }

            if (\Input::get('statistic_logger_fast_mode_interval')) {
                $input[] = ['config_key' => 'statistic_logger_fast_mode_interval', 'config_value' => \Input::get('statistic_logger_fast_mode_interval')];
            }

            if (\Input::get('statistic_logger_low_mode_interval')) {
                $input[] = ['config_key' => 'statistic_logger_low_mode_interval', 'config_value' => \Input::get('statistic_logger_low_mode_interval')];
            }

            if (\Input::get('screenshot_interval')) {
                $input[] = ['config_key' => 'screenshot_interval', 'config_value' => \Input::get('screenshot_interval')];
            }

            for ($i = 0, $len = count($input); $i < $len; $i++) {
                \Configuration::where('config_key', '=', $input[$i]['config_key'])->delete();
                $config = new \Configuration();
                $config->config_key = $input[$i]['config_key'];
                $config->config_value = $input[$i]['config_value'];
                $config->save();
            }

            \Log::info($input);

            return BaseController::response(array(
                'msg' => 'visionone_create_configuration_success',
                'method' => 'post',
                'data' => [],
                'status' => \Config::get('constants.Created')
            ));
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_create_configuration_error',
                'method' => 'post',
                'debug' => $ex->getMessage(),
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }

    function validateTime($data) {
        $q = json_decode($data);
        if($data == '{}') {
            return true;
        }
        if((int)$q->timepickiTim >= 12 || (int)$q->timepickiTim < 0
            || (int)$q->timepickiMini >= 60 || (int)$q->timepickiMini < 0
            || ($q->timepickiMeri != 'PM' && $q->timepickiMeri != 'AM')) {
            return false;
        } else {
            return true;
        }
    }
}
