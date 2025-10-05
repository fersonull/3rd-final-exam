<?php
require_once "./app/Support/Response.php";
require_once "./app/Core/Session.php";

class AuthMiddleware
{
    public function handle(): bool
    {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? null;

        if (!$authHeader) {
            Response::json(401, [
                "error" => "Unauthorized",
                "message" => "Missing Authorization header. Please provide a Bearer token in the Authorization header."
            ]);
            
            return false;
        }

        if (!preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            Response::json(401, [
                "error" => "Unauthorized",
                "message" => "Malformed Authorization header. Expected format: 'Bearer <token>'."
            ]);
            
            return false;
        }

        $token = $matches[1];

        $auth = Session::get("auth");
        $sessionToken = $auth['token'] ?? null;

        if (!$sessionToken || $token !== $sessionToken) {
            Response::json(403, [
                "error" => "Forbidden",
                "message" => "Invalid or expired token. Access denied."
            ]);
            
            return false;
        }

        return true;
    }
}
