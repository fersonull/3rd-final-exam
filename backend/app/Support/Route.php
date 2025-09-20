<?php

require_once "../../app/Support/Response.php";

class Route
{

    public static function get(callable $action): mixed
    {
        $method = $_SERVER['REQUEST_METHOD'];

        if ($method !== 'GET') {
            Response::json(400, [
                'message' => "Method not allowed."
            ]);
        }

        return $action();
    }
}
