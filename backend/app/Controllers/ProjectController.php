<?php

require_once "./app/Models/Project.php";
require_once "./app/Support/Response.php";

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
        $project = $_POST;

        Response::json(200, $project);
    }
}
