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

    public function tasks()
    {
        $params = $_GET;

        if (!$params['pid']) {
            return Response::json(400, [
                "error" => "Project ID is required"
            ]);
        }

        $result = $this->analyticsModel->tasks($params['pid']);

        Response::json(200, $result);
    }
}