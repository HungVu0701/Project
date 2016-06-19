<?php

namespace Visionone\Repositories;

interface InformRepositoryInterface
{
    public function findAll();

    public function findAllPublishByPhoneNumber($phoneNumber);

    public function create(array $data);

    public function delete($id);

    public function publish($id);

    public function update($id, array $data);

    public function getInformForm();
    
    public function getInformApi($residentId);
}
