<?php
namespace Controllers;

class HomeController extends BaseController {

    public function index() {
        $user_type = '';
        if( \Session::has('user_type')) {
            $user_type = \Session::get('user_type');
        }
        if ($user_type == "Admin") {
            $this->view('user.index');
        } else if ($user_type == "SubAdmin") {
            $this->view('home.help');
        } else if ($user_type == "User") {
            $this->view('home.help');
        } else {
            $this->view('home.404');
        }
    }

    public function pageNotFoundIndex() {
        $this->view('home.404');
    }

    public function helpIndex() {
        $this->view('home.help');
    }

    public function overviewIndex() {
        $this->view('home.overview');
    }

    public function aboutIndex() {
        $this->view('home.about');
    }
}
