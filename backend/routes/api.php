<?php

require_once "./app/Core/Router.php";
require_once "./app/Support/Response.php";
require_once "./app/Controllers/TestController.php";
require_once "./app/Controllers/AuthController.php";
require_once "./app/Controllers/UserController.php";
require_once "./app/Middlewares/AuthMiddleware.php";


Router::get('/v1/movies/{id}/page/{page}', function ($id, $page) {
    Response::json(200, "Movie ID: $id, Page: $page");
});

// Router::get('/v1/{name}', function ($name) {
//     Response::json(200, "Welcome, $name!");
// });

Router::post('/v1/new', function () {
    Response::json(201, "Success post");
});

// auth relatedt routes
Router::post('/v1/login', 'AuthController@login');


// test

Router::get('/v1/params', 'TestController@pageParams');


Router::dispatch();
