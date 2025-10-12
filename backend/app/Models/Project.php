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

    public function find(int $id): ?array
    {
        $stmt = self::db()->prepare("SELECT * FROM $this->table WHERE id = :id");
        $stmt->execute(["id" => $id]);
        $row = $stmt->fetch();

        return $row ?: null;
    }

    public function create(array $data): ?array
    {
        $stmt = self::db()->prepare("INSERT INTO $this->table VALUES (:id, :name, :description, :owner_id, status)");
        $stmt->execute($data);

        $projectID = $data["id"];
        $project = $this->find($projectID);

        return $project ?: null;
    }
}
