<?php

require_once "./app/Core/Model.php";

class Analytics extends Model
{

    protected string $taskstb = "tasks";
    protected string $projectstb = "projects";


    public function tasks(string $pid): ?array
    {
        $stmt = self::db()->prepare("
            SELECT
                COUNT(*) as total_tasks,
                COUNT(CASE WHEN status = 'finished' THEN 1 ELSE NULL END) as finished_tasks,
                COUNT(CASE WHEN status = 'ongoing' THEN 1 ELSE NULL END) as ongoing_tasks,
                COUNT(CASE WHEN status = 'overdue' THEN 1 ELSE NULL END) as overdue_tasks
            FROM $this->taskstb
            WHERE project_id = :pid
        ");

        $stmt->execute([
            "pid" => $pid
        ]);

        $rows = $stmt->fetch();

        return $rows ?: null;
    }

}