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

    public function index()
    {
        $tasks = $this->taskModel->all();

        // Add the "overdue" status to each task if its due_date is in the past and status is not completed.
        $now = strtotime(date("Y-m-d"));
        foreach ($tasks as &$task) {
            $isOverdue = false;
            if (
                isset($task["due_date"])
                && isset($task["status"])
                && $task["status"] !== "completed"
                && strtotime($task["due_date"]) < $now
            ) {
                $isOverdue = true;
            }
            $task["overdue"] = $isOverdue;
        }
        unset($task);

        Response::json(200, $tasks);
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
            'assignee_id' => 'max:32',
            'project_id' => 'required|string|max:32'
        ]);

        if ($validator->fails()) {
            return Response::json(400, [
                'errors' => $validator->errors()
            ]);
        }

        $request["id"] = AuthService::generateID();

        if (!isset($request["assignee_id"]) || $request["assignee_id"] === "" || $request["assignee_id"] === "null") {
            $request["assignee_id"] = null;
        }

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
        // -- START: update method from Task.php (model) --
        $request = $_POST;

        // Model's update method logic inserted here, adapted for controller:
        $stmt = $this->taskModel::db()->prepare("
            UPDATE tasks
            SET title = :title,
                description = :description,
                priority = :priority,
                status = :status,
                due_date = :due_date,
                assignee_id = :assignee_id,
                project_id = :project_id
            WHERE id = :id
        ");
        $stmt->execute([
            "title" => $request["title"],
            "description" => $request["description"],
            "priority" => $request["priority"],
            "status" => $request["status"],
            "due_date" => $request["due_date"],
            "assignee_id" => $request["assignee_id"],
            "project_id" => $request["project_id"],
            "id" => $id,
        ]);

        $task = $this->taskModel->find($id);

        if ($task) {
            $response = ["success" => true, "message" => "Task updated successfully", "task" => $task];
        } else {
            $response = ["success" => false, "message" => "Task update failed", "task" => null];
        }

        return Response::json(200, $response);
        // -- END: update method from Task.php (model) --
    }

    public function project($projectId, $limit = null)
    {
        $tasks = $this->taskModel->project($projectId, $limit);

        $now = strtotime(date("Y-m-d"));

        foreach ($tasks as &$task) {
            $isOverdue = false;

            if (
                isset($task["due_date"]) &&
                isset($task["status"]) &&
                $task["status"] !== "completed" &&
                strtotime($task["due_date"]) < $now
            ) {
                $isOverdue = true;
                $this->taskModel->updateStatus($task["id"], "overdue");
            }

            $task["overdue"] = $isOverdue;
        }

        unset($task);

        Response::json(200, $tasks);
    }

    
    public function isTaskOverdue($taskId)
    {
        $taskModel = new Task();
        $task = $taskModel->find($taskId);

        if (!$task || !isset($task["due_date"])) {
            return Response::json(404, ["error" => "Task not found or due date missing."]);
        }

        return Response::json(200, ["overdue" => $task["overdue"]]);
    }

    public function calendar($projectId, $startDate, $endDate)
    {
        // Validate date format
        if (!$this->isValidDate($startDate) || !$this->isValidDate($endDate)) {
            return Response::json(400, [
                "success" => false,
                "error" => "Invalid date format. Use YYYY-MM-DD format."
            ]);
        }

        $tasks = $this->taskModel->getTasksByDateRange($projectId, $startDate, $endDate);

        // Add overdue status to each task
        $now = strtotime(date("Y-m-d"));
        foreach ($tasks as &$task) {
            $isOverdue = false;
            if (
                isset($task["due_date"]) &&
                isset($task["status"]) &&
                $task["status"] !== "completed" &&
                strtotime($task["due_date"]) < $now
            ) {
                $isOverdue = true;
            }
            $task["overdue"] = $isOverdue;
        }
        unset($task);

        return Response::json(200, [
            "success" => true,
            "data" => $tasks,
            "message" => "Calendar tasks retrieved successfully"
        ]);
    }

    private function isValidDate($date)
    {
        $d = DateTime::createFromFormat('Y-m-d', $date);
        return $d && $d->format('Y-m-d') === $date;
    }
}