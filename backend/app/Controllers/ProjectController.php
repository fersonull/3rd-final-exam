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

    public function find($id)
    {
        $project = $this->projectModel->find($id);

        if (!$project) {
            Response::json(404, [
                "error" => "Project not found"
            ]);
        }

        Response::json(200, [
            "data" => $project
        ]);
    }

    public function store()
    {
        $request = $_POST;

        $validator = Validate::make($request, [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            Response::json(400, [
                'errors' => $validator->errors()
            ]);
            return;
        }

        $user = Session::get("auth")["user"];

        $request["id"] = AuthService::generateID();
        $request["owner_id"] = $user["id"];

        $result = $this->projectModel->create($request);

        Response::json(201, $result);
        return;
    }

    public function getUsersProjects()
    {
        $authUser = Session::get("auth")["user"];

        $projects = $this->projectModel->users($authUser["id"]);

        $statusCode = $projects["success"] ? 200 : 404;

        Response::json($statusCode, $projects);
    }

    public function tasks($projectId)
    {
        $tasks = $this->projectModel->tasks($projectId);
        Response::json(200, $tasks);
    }

    public function members($projectId)
    {
        $members = $this->projectModel->members($projectId);


        $statusCode = $members["success"] ? 200 : 404;

        Response::json($statusCode, $members["data"]);
    }
}
