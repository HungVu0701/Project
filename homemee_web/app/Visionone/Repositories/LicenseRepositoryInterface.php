<?php

namespace Visionone\Repositories;

interface LicenseRepositoryInterface
{
    public function findAll();

    public function findById($id);

    public function findTenantUsingById($id);

    public function create(array $data);

    public function delete($id);

    public function getLicenseForm();
}
