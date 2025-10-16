<?php

require_once "./app/Core/Model.php";
require_once "./app/Services/AuthService.php";

class Member extends Model
{
    protected string $table = "project_members";

    public function create(array $data): ?array
    {
        $stmt = self::db()->prepare("INSERT INTO $this->table (id, user_id, project_id, role) VALUES (:id, :user_id, :project_id, :role)");
        $stmt->execute([
            "id" => AuthService::generateID(),
            "user_id" => $data["user_id"],
            "project_id" => $data["project_id"],
            "role" => $data["role"],
        ]);
        return $stmt->rowCount() > 0 ? ["success" => true, "message" => "Member created successfully"] : ["success" => false, "message" => "Failed to create member"];
    }

    public function all(string $projectId): ?array
    {
        $stmt = self::db()->prepare("SELECT * FROM $this->table WHERE project_id = :project_id");
        $stmt->execute(["project_id" => $projectId]);
        $rows = $stmt->fetchAll();
        return $rows ?: null;
    }
}