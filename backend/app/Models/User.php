<?php

require_once "./app/Core/Model.php";

class User extends Model
{
    protected string $table = 'users';

    public function all(): ?array
    {
        $stmt = self::db()->prepare("SELECT * FROM $this->table");
        $stmt->execute();

        $row = $stmt->fetchAll();
        return $row ?: null;
    }

    public function find($id): ?array
    {
        $stmt = self::db()->prepare("SELECT * FROM $this->table WHERE id = :id");
        $stmt->execute(['id' => $id]);

        $row = $stmt->fetch();
        return $row ?: null;
    }
}
