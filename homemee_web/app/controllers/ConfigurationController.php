<?php
namespace Controllers;
use Visionone\Repositories\ConfigurationRepositoryInterface;

class ConfigurationController extends BaseController {
    public $configuration;

    public function __construct(ConfigurationRepositoryInterface $configurations ) {
        parent::__construct();
        $this->configuration = $configurations;
    }

    public function get_all_configuration() {
        return \Response::make($this->configuration->findAll());
    }

    public function get_all_configuration_view() {
        $user_type = '';
        if( \Session::has('user_type')) {
            $user_type = \Session::get('user_type');
        }
        if ($user_type == "Admin") {
            $this->view('configuration.admin');
        } else if ($user_type == "SubAdmin") {
            $this->view('configuration.subadmin');
        } else {
            $this->view('home.404');
        }
    }

    public function save() {
        return \Response::make($this->configuration->save());
    }
}
