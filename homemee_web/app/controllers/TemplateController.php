<?php
namespace Controllers;
use Visionone\Repositories\TemplateRepositoryInterface;
use Visionone\Repositories\Eloquent\ProjectRepository;

class TemplateController extends BaseController {

    protected $templates;
    public function __construct(TemplateRepositoryInterface $templates) {
        parent::__construct();
        $this->templates = $templates;
    }

    public function index() {
        $this->view('template.index');
    }

    public function listTemplate() {
        return \Response::make($this->templates->findAll());
    }

    public function createTemplate() {
        return \Response::make($this->templates->create(\Input::all()));
    }

    public function deleteTemplate($template_id) {
        return \Response::make($this->templates->delete($template_id));
    }
}