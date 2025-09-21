<?php

require_once "./app/Core/Router.php";
require_once "./app/Support/Response.php";
require_once "./app/Controllers/TestController.php";
require_once "./app/Controllers/UserController.php";
require_once "./app/Middlewares/AuthMiddleware.php";

Router::get('/', function () {
    Response::json(200, "Welcome to Home Page!");
});

Router::get('/users', 'UserController@index');
Router::get('/users/{id}', 'UserController@findById');

Router::get('/test', 'TestController@index');

Router::get('/test/{id}', 'TestController@get', ['AuthMiddleware']);

Router::dispatch();
