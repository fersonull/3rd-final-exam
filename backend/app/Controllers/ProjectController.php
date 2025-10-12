<?php

require_once "./app/Models/Project.php";
require_once "./app/Support/Response.php";
require_once "./app/Core/Session.php";
require_once "./app/Services/AuthService.php";

class ProjectController
{
    private ?Project $projectModel = null;

    public function __construct()
    {
        $this->projectModel = new Project;
    }

    public function index()
    {
        $projects = $this->projectModel->all();
        Response::json(200, $projects);
    }

    public function store()
    {
        $request = $_POST;

        $user = Session::get("auth")["user"];

        $request["id"] = AuthService::generateID();
        $request["owner_id"] = $user["id"];

        $project = $this->projectModel->create($request);
    }

    public function getUsersProjects()
    {
        $authUser = Session::get("auth")["user"];

        $projects = $this->projectModel->userProjects($authUser["id"]);

        Response::json(200, $projects);
    }
}
