<?php

require_once "./app/Core/Router.php";
require_once "./app/Support/Response.php";
require_once "./app/Controllers/TestController.php";
require_once "./app/Controllers/AuthController.php";
require_once "./app/Controllers/UserController.php";
require_once "./app/Middlewares/AuthMiddleware.php";

// auth related routes
Router::post('/v1/login', 'AuthController@login');
Router::post('/v1/signup', 'AuthController@signup');
Router::get('/v1/session', 'AuthController@session');
Router::post('/v1/logout', 'AuthController@logout', ['AuthMiddleware']);

// project related routes
Router::get('/v1/projects', 'ProjectController@index', ['AuthMiddleware']);
Router::get('/v1/projects/users', 'ProjectController@getUsersProjects', ['AuthMiddleware']);
Router::post('/v1/projects', 'ProjectController@store', ['AuthMiddleware']);

Router::dispatch();
