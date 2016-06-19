<?php

namespace Visionone\Repositories;

interface ResidentRepositoryInterface
{
    public function findAll();

    public function findById($id);
}
