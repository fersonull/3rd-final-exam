<?php

require_once "./app/Models/Task.php";
require_once "./app/Support/Response.php";
require_once "./app/Services/AuthService.php";
require_once "./app/Support/Validate.php";

class TaskController
{
    private ?Task $taskModel;

    public function __construct()
    {
        $this->taskModel = new Task;
    }

    public function store()
    {
        $request = $_POST;

        $validator = Validate::make($request, [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'priority' => 'required|string|in:low,normal,high',
            'status' => 'required|string|in:pending,in_progress,completed',
            'due_date' => 'required|date',
            'assignee_id' => '|string|max:255',
            'project_id' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return Response::json(400, [
                'errors' => $validator->errors()
            ]);
        }

        $request["id"] = AuthService::generateID();
        $request["assignee_id"] = Session::get("auth")["user"]["id"];

        $task = $this->taskModel->create($request);

        return Response::json(201, $task);
    }

    public function find($id)
    {
        $task = $this->taskModel->find($id);

        return Response::json(200, $task);
    }

    public function update($id)
    {
        $request = $_POST;

        $task = $this->taskModel->update($id, $request);

        return Response::json(200, $task);
    }
}