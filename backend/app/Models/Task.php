<?php

require_once "./app/Support/Response.php";

class Task extends Model
{
    protected string $table = "tasks";

    public function create(array $data): ?array
    {

        $stmt = self::db()->prepare("INSERT INTO $this->table (id, title, description, priority, status, due_date, assignee_id, project_id) VALUES (:id, :title, :description, :priority, :status, :due_date, :assignee_id, :project_id)");
        $stmt->execute([
            "id" => $data["id"],
            "title" => $data["title"],
            "description" => $data["description"],
            "priority" => $data["priority"],
            "status" => $data["status"],
            "due_date" => $data["due_date"],
            "assignee_id" => $data["assignee_id"],
            "project_id" => $data["project_id"],
        ]);

        $task = $this->find($data["id"]);

        return ["success" => true, "message" => "Task created successfully", "task" => $task] ?: null;  
    }

    public function find(string $id): ?array
    {
        $stmt = self::db()->prepare("SELECT * FROM $this->table WHERE id = :id");
        $stmt->execute(["id" => $id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }
}