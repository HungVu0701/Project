<?php

namespace Controllers;

use Visionone\Repositories\FeeRepositoryInterface;

class FeeController extends BaseController
{
    public $fee;

    public function __construct(FeeRepositoryInterface $charge)
    {
        parent::__construct();
        $this->fee = $charge;
    }

    public function index()
    {
        $this->view('fee.index');
    }

    public function getAll()
    {
        $month = \Input::get('month');
        if ($month == null) {
            $month = (new \DateTime())->format('Ym');
        }
        return \Response::make($this->fee->findAll($month));
    }

    public function getAllApi($residentId)
    {
        $year = (new \DateTime())->format('Y');
        return \Response::make($this->fee->findApi($residentId, $year));
    }

    public function sendSms($feeId) {
        return \Response::make($this->fee->sendSms($feeId));
    }

    public function publish($feeId) {
        return \Response::make($this->fee->publish($feeId));
    }

    public function uploadListFee()
    {
//        return "Aaaa";
        try {
            $form = $this->fee->getFeeForm();
            $data = $form->getInputData();
            $file = $data['fee_list'];
            $file = fopen($file, "r");
            $fee_list = [];
            $count = 0;
            while (!feof($file)) {
                $tmp = fgetcsv($file);
//                if (trim($tmp[0]) != null and trim($tmp[1]) != null) {
//                    $fee_list[] = ['name' => trim($tmp[0]),
//                        'fee_id' => trim($tmp[1]),
//                        'description' => trim($tmp[2]),
//                    ];
//                    $count++;
//                }
                $fee_list[] = [
                    'month' => trim($tmp[1]),
                    'room_name' => trim($tmp[2]),
                    'manager_fee' => (int)trim($tmp[5]),
                    'bicycle_fee' => (int)trim($tmp[6]),
                    'moto_fee' => (int)trim($tmp[7]),
                    'auto_fee' =>(int)trim($tmp[8]),
                    'water_fee' => (int)trim($tmp[9]),
                ];
                $count++;
            }
            fclose($file);
           // return "".$fee_list;
            if(count($fee_list) > 0 ){
                return \Response::make($this->fee->uploadListFee($fee_list));
            }else{
                return BaseController::response(array(
                    'msg' => 'homemee_no_imported',
                    'method' => 'POST',
                    'status' => \Config::get('constants.Bad_Request')));
            }

//            if ($count > \Config::get('visionone.max_fee_imported')) {
//                return BaseController::response(array(
//                    'msg' => 'visionone_reach_max_fee_imported',
//                    'method' => 'POST',
//                    'status' => \Config::get('constants.Bad_Request')
//                ));
//            } else {
//                return \Response::make($this->fee->uploadListfee($fee_list));
//            }
        } catch (\Exception $ex) {
            \Log::error($ex);
            return BaseController::response(array(
                'msg' => 'visionone_upload_fee_list_error',
                'debug' => $ex->getMessage(),
                'method' => 'post',
                'status' => \Config::get('constants.Internal_Server_Error')
            ));
        }
    }
}
