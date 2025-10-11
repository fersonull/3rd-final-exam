<?php
require_once "./app/Models/User.php";

class AuthService
{
    public static function generateToken(array $payload, ?string $secret = null): string
    {
        $secret = $_ENV['MY_SECRET_KEY'] ?? 'default-skey';

        $header = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
        $body = base64_encode(json_encode($payload));
        $signature = hash_hmac('sha256', "$header.$body", $secret, true);
        $signature = base64_encode($signature);

        return "$header.$body.$signature";
    }

    public static function generateID(): string
    {
        $userModel = new User;

        do {
            $id = bin2hex(random_bytes(16));
            $userExists = $userModel->find($id);
        } while ($userExists);

        return $id;
    }
}
