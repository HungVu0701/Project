<?php
namespace Controllers;
use Visionone\Repositories\UserRepositoryInterface;

class UserController extends BaseController {

    public $user;
    public function __construct(UserRepositoryInterface $user ) {
        parent::__construct();
        $this->user = $user;
    }

    public function index() {
        $this->view('user.index');
    }
    public function settingUserIndex($user_id) {
        $items = array('user_id' => $user_id);
        $this->view('user.setting', compact('items'));
    }

    public function listUser() {
        return \Response::make($this->user->findAll());
    }

    public function detailUser($id) {
        return \Response::make($this->user->findById($id));
    }

    public function saveUser() {
        $data = \Input::all();
        $check = $data['method'];

        if ($check == 'CREATE') {
            return $this->user->saveUser(null);
        } elseif ($check == 'EDIT') {
            $id = $data['userId'];
            return $this->user->saveUser($id);
        }
    }

    public function deleteUser($userId) {
        return $this->user->delete($userId);
    }

    public function changePassword($id) {
        return $this->user->changePassword($id);
    }

    public function resetPassword($id) {
        return $this->user->resetPassword($id);
    }

    public function getAllRole(){
        return $this->user->getAllRole();
    }

    public function getRolesByTypeResource() {
        return $this->user->getRolesByTypeResource();
    }

    public function getResourceNotPermission($user_id) {
        return $this->user->getResourceNotPermission($user_id);
    }

    public function addPermission() {
        return $this->user->addPermission();
    }

    public function getPermissionByUser($user_id, $resource_type, $resource_id) {
        return $this->user->getPermissionByUser($user_id, $resource_type, $resource_id);
    }

    public function getAllPermissionByUser($user_id) {
        return $this->user->getAllPermissionByUser($user_id);
    }

    public function updateLicense($id)
    {
        return \Response::make($this->user->updateLicense($id));
    }
}
