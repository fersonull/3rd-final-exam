<?php

require_once "./app/Support/Response.php";

class Task extends Model
{
    protected string $table = "tasks";

    public function all(): ?array
    {
        $stmt = self::db()->prepare("SELECT * FROM $this->table");
        $stmt->execute();
        $rows = $stmt->fetchAll();
        return $rows ?: null;
    }

    public function total(): ?int
    {
        $stmt = self::db()->prepare("SELECT COUNT(*) FROM $this->table");
        $stmt->execute();
        $total = $stmt->fetchColumn();
        return $total ?: null;
    }

    public function create(array $data): ?array
    {
        $stmt = self::db()->prepare("
        INSERT INTO $this->table (id, title, description, priority, status, due_date, assignee_id, project_id) VALUES (:id, :title, :description, :priority, :status, :due_date, :assignee_id, :project_id)");
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
        $isOverdue = false;

        if (
            isset($task["due_date"]) && 
            isset($task["status"]) &&
            $task["status"] !== "completed" &&
            strtotime($task["due_date"]) < strtotime(date("Y-m-d"))
        ) {
            $isOverdue = true;
            if ($task["status"] !== "overdue") {
                $this->updateStatus($data["id"], "overdue");
            }
        }

        return ["success" => true, "message" => "Task created successfully", "task" => $task] ?: null;  
    }

    public function find(string $id): ?array
    {
        $stmt = self::db()->prepare("SELECT * FROM $this->table WHERE id = :id");
        $stmt->execute(["id" => $id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function project(string $projectId, $limit = null): ?array
    {
        $sql = "
            SELECT 
                t.*,
                u.id AS assignee_id, 
                u.name AS assignee_name, 
                u.email AS assignee_email
            FROM {$this->table} t
            LEFT JOIN users u ON t.assignee_id = u.id
            WHERE t.project_id = :project_id
            ORDER BY t.created_at DESC
        ";

        if ($limit) {
            $sql .= " LIMIT " . intval($limit); // safer than binding LIMIT
        }

        $stmt = self::db()->prepare($sql);
        $stmt->execute([
            "project_id" => $projectId
        ]);

        $rows = $stmt->fetchAll();
        return $rows ?: null;
    }


    public function update(string $id, array $data): ?array
    {
        try {
            self::db()->beginTransaction();

            $existingTask = $this->find($id);
            if (!$existingTask) {
                self::db()->rollBack();
                return [
                    "success" => false, 
                    "error" => "Task not found"
                ];
            }

            $fields = [
                'title',
                'description',
                'priority',
                'status',
                'due_date',
                'assignee_id',
                'project_id'
            ];

            $set = [];
            $params = [];
            foreach ($fields as $field) {
                if (array_key_exists($field, $data)) {
                    $set[] = "$field = :$field";
                    $params[$field] = $data[$field];
                }
            }

            if (empty($set)) {
                self::db()->rollBack();
                return [
                    "success" => false, 
                    "error" => "No fields provided to update"
                ];
            }

            $setSql = implode(', ', $set);
            $params['id'] = $id;

            $sql = "UPDATE $this->table SET $setSql WHERE id = :id";
            $stmt = self::db()->prepare($sql);
            $success = $stmt->execute($params);

            if (!$success) {
                self::db()->rollBack();
                return [
                    "success" => false, 
                    "error" => "Failed to update task"
                ];
            }

            $updatedTask = $this->find($id);
            
            self::db()->commit();
            
            return [
                "success" => true, 
                "message" => "Task updated successfully", 
                "task" => $updatedTask
            ];

        } catch (Exception $e) {
            self::db()->rollBack();
            return [
                "success" => false, 
                "error" => "Database error: " . $e->getMessage()
            ];
        }
    }

    public function updateStatus(string $id, string $status): ?array
    {
        $stmt = self::db()->prepare("UPDATE $this->table SET status = :status WHERE id = :id");
        $stmt->execute(["status" => $status, "id" => $id]);
        return ["success" => true, "message" => "Task status updated successfully"];
    }

    public function getTasksByDateRange(string $projectId, string $startDate, string $endDate): ?array
    {
        $stmt = self::db()->prepare("
            SELECT 
                t.*,
                u.id AS assignee_id, 
                u.name AS assignee_name, 
                u.email AS assignee_email
            FROM {$this->table} t
            LEFT JOIN users u ON t.assignee_id = u.id
            WHERE t.project_id = :project_id 
            AND t.due_date BETWEEN :start_date AND :end_date
            ORDER BY t.due_date ASC, t.created_at DESC
        ");
        
        $stmt->execute([
            "project_id" => $projectId,
            "start_date" => $startDate,
            "end_date" => $endDate
        ]);

        $rows = $stmt->fetchAll();
        return $rows ?: [];
    }
}