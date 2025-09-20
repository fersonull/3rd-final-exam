<?php
require_once "./config/cors.php";
require_once "./app/Support/Router.php";
require_once "./app/Support/Response.php";
require_once "./app/Controllers/TestController.php";
require_once "./app/Middlewares/AuthMiddleware.php";

Router::get('/', function () {
    Response::json(200, "Welcome to Home Page!");
});

Router::get('/test', 'TestController@index');

Router::get('/test/{id}', 'TestController@get', ['AuthMiddleware']);

Router::dispatch();