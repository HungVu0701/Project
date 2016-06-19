<?php

Route::group([ 'namespace' => 'Controllers'], function () {
    // LANGUAGE
    Route::post('/language/change',['as' => 'language', 'uses' => 'BaseController@changeLanguage']);
    // LOGIN
    Route::get('/404', ['as' => 'home', 'uses' => 'HomeController@pageNotFoundIndex']);
    Route::get('/login', ['as' => 'login', 'uses' => 'AuthController@loginIndex']);
    Route::post('/login', ['as' => 'auth.login', 'uses' => 'AuthController@login']);
    Route::post('/login_api', ['as' => 'auth.login_api', 'uses' => 'AuthController@loginApi']);

    Route::post('/add_xxx', function() {
        $data = array();
        $data['password'] = \Config::get('visionone.password_default');
        $data['create_by'] = 1;
        $data['manager_id'] = 1;
        $data['email'] = '0978402941';
        $data['type'] = '';
        \Sentry::createUser($data);
    });

    Route::group(['before' => 'api_token'], function() {
        Route::post('/informs', 'InformController@create');
        Route::post('/informs/{id}/delete', 'InformController@delete');
        Route::post('/informs/{id}/update', 'InformController@update');
        Route::post('/informs/{id}/publish', 'InformController@publish');
        Route::get('/informs', 'InformController@getAll');

        Route::get('/rooms', 'RoomController@getAll');
        Route::get('/residents', 'ResidentController@getAll');
        Route::get('/fees', 'FeeController@getAll');

        Route::get('/residents/{id}/fee', 'FeeController@getAllApi');
        Route::get('/residents/{id}/inform', 'InformController@getInformApi');
        Route::post('/fees/{id}/sms', 'FeeController@sendSms');
        Route::post('/fees/{id}/publish', 'FeeController@publish');
        Route::post('/fees/publish_all', 'FeeController@publishAll');
        Route::post('/fees/postFees', 'FeeController@uploadListFee');

    });

    Route::group(['before' => 'auth'], function() {
        Route::get('/informs/index','InformController@index');
        Route::get('/rooms/index','RoomController@index');
        Route::get('/residents/index','ResidentController@index');
        Route::get('/fees/index','FeeController@index');

        Route::get('/', ['as' => 'home', 'uses' => 'InformController@index']);
        Route::get('/logout',['as' => 'logout', 'uses' => 'AuthController@logoutIndex']);
    });

    //Page not found
    App::missing(function() {
        return Response::make(View::make('error.error_page'), 404);
    });
});

//Route::when('*', 'csrf', ['post']);