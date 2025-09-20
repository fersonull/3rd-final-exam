<?php
class AuthMiddleware
{
    public function handle(): bool
    {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? null;

        if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            http_response_code(401);
            echo json_encode(["error" => "Unauthorized"]);
            return false;
        }

        $token = $matches[1];

        // Example check
        if ($token !== "my-secret-token") {
            http_response_code(403);
            echo json_encode(["error" => "Forbidden"]);
            return false;
        }

        return true; // continue
    }
}
