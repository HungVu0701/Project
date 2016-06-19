<?php
namespace Controllers;
use Visionone\Repositories\UserRepositoryInterface;

class AuthController extends BaseController {
    protected $users;

    public function __construct(UserRepositoryInterface $users) {
        parent::__construct();
        $this->users = $users;
    }

    public function loginIndex() {
        if (!\Session::has('token') || \Session::get('token') == null ||
            (!\Session::has('session_expired_time') || ((time() - \Session::get('session_expired_time')) > \Config::get('visionone.session_expired_time')))
        ) {
            if (\Session::get('login_times') > 3) {
                \Session::set('captcha', true);
            }
            $this->view('home.login');
        } else {
            return \Redirect::to('/informs');
        }
    }

    public function login() {
        if (\Session::get('login_times') > 3) {
            // check captcha
            $rules = ['captcha' => 'required|captcha'];
            $validator = \Validator::make(\Input::all(), $rules);
            if ($validator->fails()) {
                return $this->redirectBack(['login_errors' => true, 'captcha' => true, 'msg'=>trans('notify.visionone_captcha_miss_match')]);
            }
        }
        if (!$this->users->login()) {
            // for auth error
            if (!\Session::has('login_times')) {
                \Session::set('login_times', 1);
            } else {
                \Session::set('login_times', \Session::get('login_times') + 1);
            }
            if (\Session::get('login_times') > 3) {
                return $this->redirectBack(['login_errors' => true, 'captcha' => true, 'msg' => \Session::get('error_message')]);
            }
            return $this->redirectBack(['login_errors' => true, 'captcha' => false, 'msg' => \Session::get('error_message')]);
        } else {
            if (\Session::get('is_first_login') == 0) {
                \Session::set('is_first_login', 1);
                return \Redirect::to('/');
            } else {
                \Session::set('flag_is_first_login', 1);
                return $this->view('home.change_pass');
            }
        }
    }

    public function loginApi() {
        return \Response::make($this->users->loginApi());
    }

    public function logoutIndex() {
        BaseController::cleanSession();
        return $this->redirectRoute('login', [], ['logout_message' => true]);
    }

    public function change_pass_success() {
        \Session::set('flag_is_first_login', 0);
        return \Redirect::to('/');
    }
}
