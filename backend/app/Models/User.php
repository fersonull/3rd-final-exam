<?php

require_once "./app/Core/Model.php";

class User extends Model
{
    protected string $table = 'users';

    public function all(): ?array
    {
        $stmt = self::db()->prepare("SELECT * FROM $this->table");
        $stmt->execute();

        $rows = $stmt->fetchAll();
        return $rows ?: null;
    }

    public function find(string $id): ?array
    {
        $stmt = self::db()->prepare("SELECT * FROM $this->table WHERE id = :id");
        $stmt->execute(['id' => $id]);

        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function create(array $data): ?array
    {
        $stmt = self::db()->prepare('INSERT INTO users (id, name, email, password) VALUES (:id, :name, :email, :password)');
        $stmt->execute([
            'id' => $data['id'],
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
        ]);

        $id = $data["id"];
        $user = $this->find($id);

        return [
            "id" => $id,
            "name" => $user["name"],
            "email" => $user["email"],
        ] ?: null;
    }


    public function findByEmail(string $email): ?array
    {
        $stmt = self::db()->prepare("SELECT * FROM $this->table WHERE email = :email");
        $stmt->execute(['email' => $email]);

        $row = $stmt->fetch();
        return $row ?: null;
    }
}
