<?php

require_once "./app/Support/Router.php";
require_once "./app/Controllers/TestController.php";

Router::get('/', function () {
    echo "Welcome to Home Page!";
});

Router::get('/test', 'TestController@index');

Router::get('/test/{id}', 'TestController@get');

Router::dispatch();
