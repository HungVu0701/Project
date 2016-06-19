<?php

namespace Controllers;

use Visionone\Repositories\InformRepositoryInterface;

class InformController extends BaseController
{
    public $license;

    public function __construct(InformRepositoryInterface $informs)
    {
        parent::__construct();
        $this->inform = $informs;
    }

    public function index()
    {
        $this->view('inform.index');
    }

    public function getAll()
    {
        return \Response::make($this->inform->findAll());
    }

    public function getInformApi($residentId)
    {
        return \Response::make($this->inform->getInformApi($residentId));
    }

    public function getAllPublishByPhoneNumber($phoneNumber)
    {
        return \Response::make($this->inform->findAllPublishByPhoneNumber());
    }

    public function getDetail($id)
    {
        return \Response::make($this->inform->findById($id));
    }

    public function create()
    {
        $form = $this->inform->getInformForm();
        if ($form->isCreateValid()) {
            $data = $form->getInputData();
            return \Response::make($this->inform->create($data));
        } else {
            return BaseController::response(array(
                'msg' => $form->getErrors(),
                'method' => 'POST',
                'status' => \Config::get('constants.Bad_Request')
            ));
        }
    }

    public function delete($id)
    {
        return \Response::make($this->inform->delete($id));
    }

    public function publish($id)
    {
        $form = $this->inform->getInformForm();
        if ($form->isDeleteValid(array('id' => $id))) {
            return \Response::make($this->inform->publish($id));
        } else {
            return BaseController::response(array(
                'msg' => $form->getErrors(),
                'method' => 'POST',
                'status' => \Config::get('constants.Bad_Request')
            ));
        }
    }

    public function update($id)
    {
        $form = $this->inform->getInformForm();
        if ($form->isDeleteValid(array('id' => $id))) {
            $data = \Input::all();
            $data['id'] = $id;
            return \Response::make($this->inform->update($id, $data));
        } else {
            return BaseController::response(array(
                'msg' => $form->getErrors(),
                'method' => 'POST',
                'status' => \Config::get('constants.Bad_Request')
            ));
        }
    }
}
