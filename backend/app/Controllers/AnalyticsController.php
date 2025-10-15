<?php

require_once "./app/Models/Analytics.php";
require_once "./app/Support/Response.php";

class AnalyticsController
{
    private ?Analytics $analyticsModel;

    public function __construct()
    {
        $this->analyticsModel = new Analytics;
    }

    public function tasks(string $pid)
    {

        if (!$pid) {
            return Response::json(400, [
                "error" => "Project ID is required"
            ]);
        }

        $result = $this->analyticsModel->tasks($pid);

        Response::json(200, $result);
    }

    public function chart(string $pid, int $days = 7)
    {
        $result = $this->analyticsModel->tasksByDateRange($pid, $days);


        if (!$result) {
            return Response::json(400, [
                "success" => false,
                "error" => "No data found"
            ]);
        }

        Response::json(200, [
            "success" => true,
            "message" => "Showing data last $days days",
            "data" => $result
        ]);
    }
}