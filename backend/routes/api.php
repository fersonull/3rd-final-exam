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
Router::get('/v1/projects/{id}/tasks', 'ProjectController@tasks', ['AuthMiddleware']);
Router::get('/v1/projects/{id}', 'ProjectController@find', ['AuthMiddleware']);
Router::post('/v1/projects', 'ProjectController@store', ['AuthMiddleware']);

// task related routes
Router::post('/v1/tasks', 'TaskController@store', ['AuthMiddleware']);
Router::get('/v1/tasks', 'TaskController@index', ['AuthMiddleware']);
Router::get('/v1/tasks/{id}', 'TaskController@find', ['AuthMiddleware']);
Router::get('/v1/tasks/total', 'TaskController@total', ['AuthMiddleware']);
Router::get('/v1/tasks/project/{projectId}', 'TaskController@project', ['AuthMiddleware']);

// analytics
Router::get("/v1/stats", "AnalyticsController@tasks");

Router::dispatch();
