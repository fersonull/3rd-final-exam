<?php

require_once "./app/Core/Router.php";
require_once "./app/Support/Response.php";
require_once "./app/Controllers/TestController.php";
require_once "./app/Controllers/AuthController.php";
require_once "./app/Controllers/UserController.php";
require_once "./app/Middlewares/AuthMiddleware.php";

Router::get('/', function () {
    Response::json(200, "Welcome to Home Page!");
});

Router::post('/new', function () {
    Response::json(201, "Success post");
});

Router::post('/login', 'AuthController@login');

Router::get('/users', 'UserController@index');
Router::get('/users/{id}', 'UserController@findById');

Router::get('/test', 'TestController@index');

Router::get('/test/{id}/history/{12}', 'TestController@get');

Router::dispatch();
