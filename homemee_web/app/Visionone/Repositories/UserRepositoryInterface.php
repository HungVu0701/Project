<?php

namespace Visionone\Repositories;

interface UserRepositoryInterface{
    
    public function findAll();

    public function findById($id);

    public function create(array $data);

    public function update(array $data);

    public function delete($id);

    public function resetPassword($id);

    public function changePassword($id);

    public function saveUser($id);

    public function getAllRole();

    public function login();

    public function loginApi();

    public function getRolesByTypeResource();

    public function getResourceNotPermission($user_id);

    public function addPermission();

    public function getAllPermissionByUser($user_id);

    public function getPermissionByUser($user_id, $resource_type, $resource_id);

    public function updateLicense($id);

}
