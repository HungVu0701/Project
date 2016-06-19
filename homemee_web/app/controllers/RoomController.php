<?php

namespace Controllers;

use Visionone\Repositories\RoomRepositoryInterface;

class RoomController extends BaseController
{
    public $license;

    public function __construct(RoomRepositoryInterface $rooms)
    {
        parent::__construct();
        $this->room = $rooms;
    }

    public function index()
    {
        $this->view('room.index');
    }

    public function getAll()
    {
        return \Response::make($this->room->findAll());
    }
}
