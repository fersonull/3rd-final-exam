<?php
require_once "./app/Support/Response.php";

class AuthMiddleware
{
    public function handle(): bool
    {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? null;

        if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            Response::json(401, ["error" => "Unauthorized"]);
            return false;
        }

        $token = $matches[1];

        // Example check
        if ($token !== "my-secret-token") {
            Response::json(403, ["error" => "Forbidden"]);
            return false;
        }

        return true; // continue
    }
}
