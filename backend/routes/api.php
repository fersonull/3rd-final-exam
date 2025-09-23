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

// auth relatedt routes
Router::post('/login', 'AuthController@login');

Router::dispatch();
