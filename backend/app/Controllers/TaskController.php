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

    public function update()
    {
        $request = $_POST;
        
        if ($_SERVER['REQUEST_METHOD'] === 'PUT' && empty($request)) {
            $input = file_get_contents('php://input');
            $request = json_decode($input, true);
        }

        if (empty($request["id"])) {
            return Response::json(400, [
                "success" => false,
                "error" => "Task ID is required"
            ]);
        }

        $taskId = $request["id"];

        $validationRules = $this->getUpdateValidationRules($request);
        
        $validator = Validate::make($request, $validationRules);
        
        if ($validator->fails()) {
            return Response::json(400, [
                "success" => false,
                "errors" => $validator->errors()
            ]);
        }

        $result = $this->taskModel->update($taskId, $request);
        
        if ($result['success']) {
            return Response::json(200, $result);
        } else {
            $statusCode = isset($result['error']) && strpos($result['error'], 'not found') !== false ? 404 : 500;
            return Response::json($statusCode, $result);
        }
    }

    private function getUpdateValidationRules(array $request): array
    {
        $rules = [];
        $fieldRules = [
            'title' => 'required|max:255',
            'description' => 'max:1000',
            'priority' => 'required|in:low,normal,high',
            'status' => 'required|in:pending,ongoing,completed,overdue',
            'due_date' => 'required|date',
            'assignee_id' => 'max:32',
            'project_id' => 'required|max:32'
        ];

        foreach ($fieldRules as $field => $rule) {
            if (array_key_exists($field, $request)) {
                $rules[$field] = $rule;
            }
        }

        return $rules;
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
        if (!$this->isValidDate($startDate) || !$this->isValidDate($endDate)) {
            return Response::json(400, [
                "success" => false,
                "error" => "Invalid date format. Use YYYY-MM-DD format."
            ]);
        }

        $tasks = $this->taskModel->getTasksByDateRange($projectId, $startDate, $endDate);

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