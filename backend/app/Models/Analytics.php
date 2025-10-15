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

    public function chartData(string $pid): ?array
    {
        $stmt = self::db()->prepare("
            SELECT 
                DATE(created_at) as date,
                COUNT(*) as total_tasks,
                COUNT(CASE WHEN status = 'finished' THEN 1 END) as finished_tasks
            FROM $this->taskstb
            WHERE project_id = :pid
            GROUP BY DATE(created_at)
            ORDER BY DATE(created_at) ASC
        ");

        $stmt->execute([
            "pid" => $pid
        ]);

        $rows = $stmt->fetchAll();

        return $rows ?: null;
    }

    public function tasksByDateRange(string $pid, int $days = 7): ?array
    {        
        $sql = "
            SELECT 
                DATE(created_at) AS date,
                COUNT(*) AS total_created,
                COUNT(CASE WHEN status = 'finished' THEN 1 END) AS total_finished
            FROM {$this->taskstb}
            WHERE project_id = :pid
              AND created_at >= (CURRENT_DATE - INTERVAL :days DAY)
            GROUP BY DATE(created_at)
            ORDER BY DATE(created_at) ASC
        ";
        $stmt = self::db()->prepare($sql);
        $stmt->execute([
            "pid" => $pid,
            "days" => $days
        ]);

        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return !empty($rows) ? $rows : null;
    }

}