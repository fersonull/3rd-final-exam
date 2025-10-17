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
Router::get('/v1/projects/users', 'ProjectController@getUsersProjects', ['AuthMiddleware','ProjectOwnerRights']);
Router::get('/v1/projects/{id}/tasks', 'ProjectController@tasks', ['AuthMiddleware', 'ProjectMemberRights']);
Router::get('/v1/projects/{id}/members', 'ProjectController@members', ['AuthMiddleware', 'ProjectOwnerRights']);
Router::get('/v1/projects/{id}', 'ProjectController@find', ['AuthMiddleware', 'ProjectOwnerRights']);
Router::post('/v1/projects', 'ProjectController@store', ['AuthMiddleware']);

// task related routes
Router::post('/v1/tasks', 'TaskController@store', ['AuthMiddleware']);
Router::get('/v1/tasks', 'TaskController@index', ['AuthMiddleware', 'ProjectOwnerRights']);
Router::get('/v1/tasks/{id}', 'TaskController@find', ['AuthMiddleware', 'ProjectOwnerRights']);
Router::get('/v1/tasks/total', 'TaskController@total', ['AuthMiddleware', 'ProjectOwnerRights']);
Router::get('/v1/tasks/project/{projectId}/{limit}', 'TaskController@project');
Router::get('/v1/tasks/calendar/{projectId}/{startDate}/{endDate}', 'TaskController@calendar', ['AuthMiddleware', 'ProjectOwnerRights']);

// analytics
Router::get("/v1/stats/{pid}", "AnalyticsController@tasks", ['AuthMiddleware','ProjectOwnerRights']);
Router::get("/v1/stats/{pid}/chart", "AnalyticsController@getDistributionData");
Router::get("/v1/stats/{pid}/chart/{days}", "AnalyticsController@chart");

Router::dispatch();
