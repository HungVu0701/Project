<?php
namespace Controllers;

use Visionone\Repositories\LayoutRepositoryInterface;
use Visionone\Repositories\Eloquent\ProjectRepository;
use Visionone\Repositories\Eloquent\GalleryRepository;

class LayoutController extends BaseController {

    protected $layouts;

    public function __construct(LayoutRepositoryInterface $layouts) {
        parent::__construct();
        $this->layouts = $layouts;
    }

    public function index() {
        $email = \Session::get('email');
        $items = array('email'=> $email);
        $this->view('layout.index', compact('items'));
    }

    public function createIndex() {
        $rootId = GalleryRepository::getRootId();
        $items = array(
            'rootId'=>$rootId,
            'layout_id' => "null", "method" => "create");
        $this->view('layout.layout', compact('items'));
    }

    public function editIndex($layout_id) {
        $rootId = GalleryRepository::getRootId();
        $items = array(
            'rootId'=>$rootId,
            'layout_id' => $layout_id, "method" => "edit");
        $this->view('layout.layout', compact('items'));
    }

    public function listLayout() {
        return \Response::make($this->layouts->findAll());
    }

    public function detailLayout($layoutId) {
        return \Response::make($this->layouts->findById($layoutId));
    }

    public function createLayout() {
        return \Response::make($this->layouts->create());
    }
    public function editLayout($id) {
        return \Response::make($this->layouts->update($id));
    }

    public function destroy_layout($layout_id) {
        return \Response::make($this->layouts->delete($layout_id));
    }

    public function duplicate_layout($layout_id) {
        return \Response::make($this->layouts->duplicate($layout_id));
    }
    public function try_lock_layout($layout_id) {
        return \Response::make($this->layouts->tryLock($layout_id));
    }
    public function release_lock_layout($layout_id) {
        return \Response::make($this->layouts->releaseLock($layout_id));
    }
}