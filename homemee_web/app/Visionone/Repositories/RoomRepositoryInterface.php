<?php

namespace Visionone\Repositories;

interface RoomRepositoryInterface
{
    public function findAll();

    public function findById($id);
}
