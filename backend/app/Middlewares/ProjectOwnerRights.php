<?php
require_once "./app/Support/Response.php";
require_once "./app/Core/Session.php";
require_once "./app/Models/Project.php";

class ProjectOwnerRights
{
    private ?Project $projectModel;

    public function __construct()
    {
        $this->projectModel = new Project;
    }

    public function handle(): bool
    {

        $user = Session::get("auth")["user"];

        $project = $this->projectModel->users($user["id"]);

        if ($user["id"] !== $project["data"][0]["owner_id"]) {
            Response::json(403, [
                "error" => [
                    "forbidden" => "You don't have access to this page."
                ]
            ]);

            return false;
        }

        return true;
    }
}