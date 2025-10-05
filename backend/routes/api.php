<?php

require_once "./app/Core/Router.php";
require_once "./app/Support/Response.php";
require_once "./app/Controllers/TestController.php";
require_once "./app/Controllers/AuthController.php";
require_once "./app/Controllers/UserController.php";
require_once "./app/Middlewares/AuthMiddleware.php";

// auth related routes
Router::post('/v1/login', 'AuthController@login');
Router::get('/v1/session', 'AuthController@session');
Router::post('/v1/logout', 'AuthController@logout', ['AuthMiddleware']);


Router::dispatch();
