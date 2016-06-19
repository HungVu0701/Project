<?php

namespace Controllers;

use Visionone\Repositories\ResidentRepositoryInterface;

class ResidentController extends BaseController
{
    public $resident;

    public function __construct(ResidentRepositoryInterface $residents)
    {
        parent::__construct();
        $this->resident = $residents;
    }

    public function index()
    {
        $this->view('resident.index');
    }

    public function getAll()
    {
        return \Response::make($this->resident->findAll());
    }
}
