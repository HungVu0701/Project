<?php

return array(


    /*
    |--------------------------------------------------------------------------
    | The default of rows for display each query
    |--------------------------------------------------------------------------
    |
    |
    */

    'default_limit_row' => 10,

    /*
    |--------------------------------------------------------------------------
    | The maximum row for each display
    |--------------------------------------------------------------------------
    |
    |
    */
    'limit_row_max' => 50,

    'page_default' => 0 ,

    /*For successful GET/PUT requests.*/
    'OK' => 200,

    /*For a successful POST request.*/
    'Created'=>201,

    /*For a request that resulted in a scheduled task being created to perform the actual request.*/
    'Accepted'=>202,

    /*For a successful request that produced no response (such as DELETE requests).*/
    'No_Content'=>204,

    /*Purpose*/
    /*When the API routes have changed (unlikely) or if the incoming request is not secure (http) then it will be redirect to the secure (https) version.*/
    'Moved_Permanently'=>301,

    /*When the resource was found at a different location. When a request to a deprecated version of the API is received, a 302 Found response will be issued to the current API version.*/
    'Found'=>302,

    /*If an If-Modified-Since header is sent in the request and the resource has not been modified since the specified date, then this response will be sent. NB. See resource specific pages for support for the If-Modified-Since header.*/
    'Not_Modified'=>304,

    'Bad_Request' =>400,

    'Unauthorized' => 401,

    'Forbidden' => 403,

    'Not_Found' => 404,

    'Internal_Server_Error' =>500,
);
