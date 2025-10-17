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

    public function invite(array $data): ?array
    {
        try {
            self::db()->beginTransaction();

            $existingMember = $this->findByUserAndProject($data['user_id'], $data['project_id']);
            if ($existingMember) {
                self::db()->rollBack();
                return [
                    "success" => false,
                    "error" => "User is already a member of this project"
                ];
            }

            $memberId = AuthService::generateID();
            $stmt = self::db()->prepare("
                INSERT INTO $this->table (id, user_id, project_id, role, joined_at) 
                VALUES (:id, :user_id, :project_id, :role, NOW())
            ");
            
            $success = $stmt->execute([
                "id" => $memberId,
                "user_id" => $data["user_id"],
                "project_id" => $data["project_id"],
                "role" => $data["role"] ?? "member"
            ]);

            if (!$success) {
                self::db()->rollBack();
                return [
                    "success" => false,
                    "error" => "Failed to add member to project"
                ];
            }

            $member = $this->findWithUserDetails($memberId);
            
            self::db()->commit();
            
            return [
                "success" => true,
                "message" => "Member added successfully",
                "member" => $member
            ];

        } catch (Exception $e) {
            self::db()->rollBack();
            return [
                "success" => false,
                "error" => "Database error: " . $e->getMessage()
            ];
        }
    }

    public function findByUserAndProject(string $userId, string $projectId): ?array
    {
        $stmt = self::db()->prepare("
            SELECT * FROM $this->table 
            WHERE user_id = :user_id AND project_id = :project_id
        ");
        $stmt->execute([
            "user_id" => $userId,
            "project_id" => $projectId
        ]);
        
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function findWithUserDetails(string $memberId): ?array
    {
        $stmt = self::db()->prepare("
            SELECT 
                pm.id,
                pm.role,
                pm.joined_at,
                u.id as user_id,
                u.name as user_name,
                u.email as user_email
            FROM $this->table pm
            JOIN users u ON pm.user_id = u.id
            WHERE pm.id = :member_id
        ");
        $stmt->execute(["member_id" => $memberId]);
        
        $row = $stmt->fetch();
        return $row ?: null;
    }
}