<?php

namespace Controllers;

use Visionone\Repositories\LicenseRepositoryInterface;

class LicenseController extends BaseController
{
    public $license;

    public function __construct(LicenseRepositoryInterface $licenses)
    {
        parent::__construct();
        $this->license = $licenses;
    }

    public function index()
    {
        $this->view('license.index');
    }

    public function getAll()
    {
        return \Response::make($this->license->findAll());
    }

    public function getDetail($id)
    {
        return \Response::make($this->license->findById($id));
    }

    public function getTenantUsing($id)
    {
        return \Response::make($this->license->findTenantUsingById($id));
    }

    public function create()
    {
        $form = $this->license->getLicenseForm();
        if ($form->isCreateValid()) {
            $data = $form->getInputData();
            return \Response::make($this->license->create($data));
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
        $form = $this->license->getLicenseForm();
        if ($form->isDeleteValid(array('id' => $id))) {
            return \Response::make($this->license->delete($id));
        } else {
            return BaseController::response(array(
                'msg' => $form->getErrors(),
                'method' => 'POST',
                'status' => \Config::get('constants.Bad_Request')
            ));
        }
    }
}
