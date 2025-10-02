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
Router::post('/v1/logout', 'AuthController@logout');

// test
Router::get('/v1/params', 'TestController@pageParams');
Router::get('/v1/auth', 'TestController@getToken');

Router::get('/v1/movies/{id}/page/{page}', function ($id, $page) {
    Response::json(200, "Movie ID: $id, Page: $page");
});

Router::dispatch();
