<?php

class Response
{
    public static function json(int $status_code, array|null $data): void
    {
        http_response_code($status_code);
        echo json_encode($data);

        exit();
    }
}
