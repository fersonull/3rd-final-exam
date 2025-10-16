<?php

require_once "./app/Core/Model.php";

class Project extends Model
{
    protected string $table = "projects";

    public function all(): ?array
    {
        $stmt = self::db()->prepare("SELECT 
            projects.*,
            users.id AS owner_id,
            users.name AS owner_name,
            users.email AS owner_email
            FROM projects
            LEFT JOIN users ON projects.owner_id = users.id");

        $stmt->execute();

        $rows = $stmt->fetchAll();
        return $rows ?: null;
    }

    public function users(string $userId): ?array
    {
        $stmt = self::db()->prepare("SELECT 
            projects.*,
            users.id AS owner_id,
            users.name AS owner_name,
            users.email AS owner_email
            FROM projects
            LEFT JOIN users ON projects.owner_id = users.id
            WHERE projects.owner_id = :user_id");

        $stmt->execute(['user_id' => $userId]);
        $rows = $stmt->fetchAll();

        return $rows ? [
            "success" => true, 
            "data" => $rows
        ] : ["success" => false, "data" => null];
    }

    public function find(string $id): ?array
    {
        $stmt = self::db()->prepare("SELECT * FROM $this->table WHERE id = :id");
        $stmt->execute(["id" => $id]);
        $row = $stmt->fetch();

        return $row ?: null;
    }

    public function create(array $data): ?array
    {
        $stmt = self::db()->prepare("INSERT INTO $this->table (id, name, description, owner_id, status) VALUES (:id, :name, :description, :owner_id, :status)");
        $stmt->execute([
            "id" => $data["id"],
            "name" => $data["name"],
            "description" => $data["description"],
            "owner_id" => $data["owner_id"],
            "status" => $data["status"],
        ]);

        $projectID = $data["id"];
        $project = $this->find($projectID);

        return $project ? [
            "success" => true, 
            "data" => $project
        ] : ["success" => false, "data" => null];
    }

    public function tasks(string $projectId): ?array
    {
        $stmt = self::db()->prepare("SELECT * FROM tasks WHERE project_id = :project_id");
        $stmt->execute(["project_id" => $projectId]);
        $rows = $stmt->fetchAll();
        return $rows ?: null;
    }

    public function members(string $projectId): ?array
    {
        $stmt = self::db()->prepare(
            "SELECT pm.*, u.name as user_name, u.email as user_email
             FROM project_members pm
             LEFT JOIN users u ON pm.user_id = u.id
             WHERE pm.project_id = :project_id"
        );
        $stmt->execute(["project_id" => $projectId]);
        $rows = $stmt->fetchAll(); 
        return $rows ? [
            "success" => true,
            "data" => $rows,
            "message" => "Members fetched successfully"
        ] : [
            "success" => false,
            "data" => null,
            "message" => "Failed to fetch members"
        ];
    }
}
